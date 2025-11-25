import { useEffect, useState } from 'react'
import { Layout } from '../components/layout/Layout'
import { ScheduleCard } from '../components/schedules/ScheduleCard'
import { Button } from '../components/ui/button'
import { Schedule } from '../types/models'
import { ScheduleService } from '../services/scheduleService'
import { toast } from 'sonner'
import { MapPin, Clock } from 'lucide-react'
import { usePageView } from '../hooks/use-page-view'

import { AnimatedBackground } from '../components/ui/animatedBackground'
import { MouseGlow } from '../components/ui/mouseGlow'
import { PageTransition } from '../components/ui/pageTransition'
import { ParallaxSection } from '../components/ui/parallaxSection'
import posthog from 'posthog-js'

import { motion } from 'framer-motion'

// Leaflet
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Icons
const buszer_icon = new URL('../assets/img/Buszer_icon.png', import.meta.url).href
const ci_icon = new URL('../assets/img/ci_icon.jpg', import.meta.url).href

const busIcon = L.icon({
  iconUrl: buszer_icon,
  iconSize: [40, 40],
  iconAnchor: [20, 20]
})

const destinationIcon = L.icon({
  iconUrl: ci_icon,
  iconSize: [30, 30],
  iconAnchor: [15, 30]
})

/* Rota real */
const routeCoordinates = [
  [-7.135, -34.845],
  [-7.1365, -34.846],
  [-7.138, -34.8455],
  [-7.139, -34.841],
  [-7.14, -34.836],
  [-7.1385, -34.829],
  [-7.137, -34.827],
  [-7.134, -34.8265],
  [-7.131, -34.826]
]

const initialLat = routeCoordinates[0][0]
const initialLng = routeCoordinates[0][1]

const Schedules = () => {
  usePageView('Schedules')

  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'schedules' | 'map'>('schedules')
  const [trackingEnabled, setTrackingEnabled] = useState(false)

  useEffect(() => {
    loadSchedules()
  }, [])

  const loadSchedules = async () => {
    try {
      const data = await ScheduleService.getSchedules()
      setSchedules(data)
    } catch (error) {
      toast.error('Erro ao carregar horários')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleTrack = (schedule: Schedule) => {
    posthog.capture('clicou_no_onibus', {
      line: schedule.line,
      campus: schedule.campus,
      horario: schedule.time,
      schedule_id: schedule.id
    })

    setViewMode('map')
    setTrackingEnabled(true)
    toast.info(`Rastreando ${schedule.line} - Campus ${schedule.campus}`)
  }

  const handleActivateTracking = () => {
    setTrackingEnabled(!trackingEnabled)
    toast.success(trackingEnabled ? 'Rastreamento desativado' : 'Rastreamento ativado')
  }

  /* MAPA */
  useEffect(() => {
    if (viewMode !== 'map') return

    let map: L.Map | null = null
    let marker: L.Marker | null = null
    let interval: any = null
    let currentRouteIndex = 0

    const mapContainer = document.getElementById('bus-map')
    if (!mapContainer) return

    mapContainer.innerHTML = ''

    try {
      map = L.map('bus-map', { scrollWheelZoom: false }).setView(
        [initialLat, initialLng],
        15
      )

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map)

      setTimeout(() => map!.invalidateSize(true), 100)

      marker = L.marker([initialLat, initialLng], { icon: busIcon }).addTo(map)

      const destinationLat = routeCoordinates[routeCoordinates.length - 1][0]
      const destinationLng = routeCoordinates[routeCoordinates.length - 1][1]

      L.marker([destinationLat, destinationLng], { icon: destinationIcon })
        .addTo(map)
        .bindPopup('Destino: Av. dos Escoteiros, Mangabeira')
        .openPopup()

      if (trackingEnabled) {
        interval = setInterval(() => {
          currentRouteIndex = (currentRouteIndex + 1) % routeCoordinates.length
          const [lat, lng] = routeCoordinates[currentRouteIndex]

          marker!.setLatLng([lat, lng])
          map!.panTo([lat, lng], { animate: true, duration: 2.0 })
        }, 4000)
      }
    } catch (e) {
      console.error('Erro no mapa:', e)
    }

    return () => {
      if (interval) clearInterval(interval)
      if (map) map.remove()
    }
  }, [viewMode, trackingEnabled])

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <AnimatedBackground />
        <MouseGlow />

        <Layout currentPath="/schedules">
          <div className="container mx-auto px-4 pt-24 pb-16 relative z-10 max-w-6xl">
            {/* ============== VIEW LISTA DE HORÁRIOS ============== */}
            {viewMode === 'schedules' && (
              <ParallaxSection speed={0.15}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Button
                    className="mb-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all duration-300 hover:scale-105"
                    onClick={() => setViewMode('map')}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    MAPA
                  </Button>

                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-muted rounded-xl h-48 animate-pulse shadow-lg"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6 mb-10">
                      {schedules.map((schedule, index) => (
                        <motion.div
                          key={schedule.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <ScheduleCard
                            schedule={schedule}
                            onTrack={() => handleTrack(schedule)}
                            className="hover:scale-[1.02] transition-all duration-300 shadow-lg"
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/*<div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto transition-all duration-300 hover:scale-105"
                    >
                      TODOS OS HORÁRIOS
                    </Button>

                  </div>*/}
                </motion.div>
              </ParallaxSection>
            )}

            {/* ============== VIEW MAPA + RASTREAMENTO ============== */}
            {viewMode === 'map' && (
              <ParallaxSection speed={-0.1}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Button
                    variant="secondary"
                    className="mb-6 transition-all duration-300 hover:scale-105"
                    onClick={() => setViewMode('schedules')}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    HORÁRIOS
                  </Button>

                  <div className="relative rounded-2xl h-[400px] sm:h-[500px] mb-8 bg-muted shadow-xl border border-border overflow-hidden">
                    <div id="bus-map" className="w-full h-full" />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Button
                      size="lg"
                      variant={trackingEnabled ? 'destructive' : 'secondary'}
                      onClick={handleActivateTracking}
                      className="transition-all duration-300 hover:scale-105 w-full sm:flex-1"
                    >
                      <MapPin className="mr-2 h-5 w-5" />
                      {trackingEnabled ? 'DESATIVAR RASTREAMENTO' : 'ATIVAR RASTREAMENTO'}
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {schedules.slice(0, 2).map((schedule, index) => (
                      <motion.div
                        key={schedule.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <ScheduleCard
                          schedule={schedule}
                          onTrack={() => handleTrack(schedule)}
                          className="hover:scale-[1.02] transition-all duration-300 shadow-lg"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </ParallaxSection>
            )}
          </div>
        </Layout>
      </div>
    </PageTransition>
  )
}

export default Schedules
