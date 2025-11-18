import { useEffect, useState } from 'react'
import { Layout } from '../components/layout/Layout'
import { ScheduleCard } from '../components/schedules/ScheduleCard'
import { Button } from '../components/ui/button'
import { Schedule } from '../types/models'
import { ScheduleService } from '../services/scheduleService'
import { toast } from 'sonner'
import { MapPin, Clock } from 'lucide-react'

// Importa o CSS do Leaflet
import 'leaflet/dist/leaflet.css'
const buszer_icon = new URL('../assets/img/Buszer_icon.png', import.meta.url).href
const ci_icon = new URL('../assets/img/ci_icon.jpg', import.meta.url).href
// Lib principal do mapa
import L from 'leaflet'

/* ÍCONE DO ÔNIBUS */
const busIcon = L.icon({
  iconUrl: buszer_icon,
  iconSize: [40, 40], // tamanho do ícone
  iconAnchor: [20, 20] // ponto que "encosta" no mapa
})

/* ÍCONE DO DESTINO (Ponto de Chegada - Vermelho)
  Usamos L.divIcon para criar um marcador simples e customizado*/
const destinationIcon = L.icon({
  iconUrl: ci_icon,
  iconSize: [30, 30],
  iconAnchor: [15, 30]
})

/* TRAJETO REAL: UFPB (Castelo Branco) para Av. dos Escoteiros (Mangabeira)*/
const routeCoordinates = [
  [-7.135, -34.845], // 1. Início (Ponto central do Campus UFPB - Castelo Branco)
  [-7.1365, -34.846],
  [-7.138, -34.8455],
  [-7.139, -34.841],
  [-7.14, -34.836],
  [-7.1385, -34.829],
  [-7.137, -34.827],
  [-7.134, -34.8265],
  [-7.131, -34.826] // 9. Chegada (Av. dos Escoteiros, s/n - Mangabeira)
]

const initialLat = routeCoordinates[0][0]
const initialLng = routeCoordinates[0][1]

const Schedules = () => {
  // ... (useState e loadSchedules omitidos por serem idênticos)
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'schedules' | 'map'>('schedules')
  const [trackingEnabled, setTrackingEnabled] = useState(false)

  // Carrega horários (mantido)
  useEffect(() => {
    loadSchedules()
  }, [])

  const loadSchedules = async () => {
    try {
      const data = await ScheduleService.getSchedules()
      setSchedules(data)
    } catch (error) {
      toast.error('Erro ao carregar horários')
      console.error('Erro ao carregar horários:', error)
    } finally {
      setLoading(false)
    }
  }

  // HandleTrack (mantido)
  const handleTrack = (schedule: Schedule) => {
    setViewMode('map')
    setTrackingEnabled(true)
    toast.info(`Rastreando ${schedule.line} - Campus ${schedule.campus}`)
  }

  // HandleActivateTracking (mantido)
  const handleActivateTracking = () => {
    setTrackingEnabled(!trackingEnabled)
    toast.success(trackingEnabled ? 'Rastreamento desativado' : 'Rastreamento ativado')
  }

  /* MAPA + SIMULAÇÃO DO ÔNIBUS
    - REMOVIDA A LINHA DE PROGRESSO
    - ADICIONADO O MARCADOR DE DESTINO
      */
  useEffect(() => {
    if (viewMode !== 'map') return

    let map: L.Map | null = null
    let marker: L.Marker | null = null
    let interval: any = null

    let currentRouteIndex = 0

    // Define as coordenadas de destino (último ponto da rota)
    const destinationLat = routeCoordinates[routeCoordinates.length - 1][0]
    const destinationLng = routeCoordinates[routeCoordinates.length - 1][1]

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

      setTimeout(() => {
        map!.invalidateSize(true)
      }, 100)

      // Adiciona o marcador do ônibus na posição inicial
      marker = L.marker([initialLat, initialLng], { icon: busIcon }).addTo(map)

      // ADICIONA O MARCADOR DE DESTINO
      L.marker([destinationLat, destinationLng], { icon: destinationIcon })
        .addTo(map)
        .bindPopup('Destino: Av. dos Escoteiros, Mangabeira') // Adiciona um popup informativo
        .openPopup() // Abre o popup ao carregar (opcional)

      /* SIMULAÇÃO: Movimenta o ônibus ponto a ponto */
      if (trackingEnabled) {
        interval = setInterval(() => {
          // Incrementa o índice. Se chegar ao final, volta ao início (loop).
          currentRouteIndex = (currentRouteIndex + 1) % routeCoordinates.length

          const [nextLat, nextLng] = routeCoordinates[currentRouteIndex]

          // Atualiza a posição do ícone
          marker!.setLatLng([nextLat, nextLng])

          // Centraliza no mapa com uma animação suave
          map!.panTo([nextLat, nextLng], { animate: true, duration: 2.0 })
        }, 4000) // 4 segundos entre cada ponto
      }
    } catch (e) {
      console.error('Erro ao inicializar o mapa:', e)
    }

    // Cleanup ao sair do mapa
    return () => {
      if (interval) clearInterval(interval)
      if (map) {
        map.off()
        map.remove()
        map = null
      }
    }
  }, [viewMode, trackingEnabled])

  return (
    <Layout currentPath="/schedules">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
          Buszer
        </h1>

        {/* BOTÃO VOLTAR À LISTA */}
        {viewMode === 'map' && (
          // Usando o botão de horários para voltar
          <Button
            variant="secondary"
            className="mb-6 gap-2"
            onClick={() => setViewMode('schedules')}
          >
            <Clock className="w-5 h-5" />
            HORÁRIOS
          </Button>
        )}

        {/* ---------------------------------------------------------
          VIEW 1: HORÁRIOS
        --------------------------------------------------------- */}
        {viewMode === 'schedules' ? (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Horários</h2>

            {loading ? (
              // skeleton
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-card rounded-xl h-48 animate-pulse" />
                ))}
              </div>
            ) : (
              // Lista de horários
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
                {schedules.map((schedule) => (
                  <ScheduleCard
                    key={schedule.id}
                    schedule={schedule}
                    onTrack={() => handleTrack(schedule)}
                  />
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8 sm:mt-12">
              <Button size="lg" className="bg-[#017D97] text-white px-8 w-full sm:w-auto">
                TODOS OS HORÁRIOS
              </Button>
              <Button
                size="lg"
                className="bg-[#017D97] text-white px-8 w-full sm:w-auto"
                onClick={() => setViewMode('map')}
              >
                MAPA
              </Button>
            </div>
          </>
        ) : (
          /* ---------------------------------------------------------
            VIEW 2: MAPA
          --------------------------------------------------------- */
          <>
            <div className="relative rounded-2xl h-[400px] sm:h-[500px] mb-6 sm:mb-8 overflow-hidden z-0">
              {/* DIV onde o mapa será renderizado */}
              <div id="bus-map" className="w-full h-full" />
            </div>

            {/* Container para os botões de controle - ESPAÇAMENTO CORRIGIDO */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Botão ativar/desativar rastreamento */}
              <Button
                size="lg"
                variant={trackingEnabled ? 'destructive' : 'secondary'}
                className="gap-2 w-full sm:flex-1"
                onClick={handleActivateTracking}
              >
                <MapPin className="w-5 h-5" />
                {trackingEnabled ? 'DESATIVAR RASTREAMENTO' : 'ATIVAR RASTREAMENTO'}
              </Button>

              {/* Botão voltar aos horários */}
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 w-full sm:flex-1"
                onClick={() => setViewMode('schedules')}
              >
                <Clock className="w-5 h-5" />
                HORÁRIOS
              </Button>
            </div>

            {/* Últimos 2 horários */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {schedules.slice(0, 2).map((schedule) => (
                <ScheduleCard
                  key={schedule.id}
                  schedule={schedule}
                  onTrack={() => handleTrack(schedule)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default Schedules
