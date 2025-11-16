import { useEffect, useState } from 'react'
import { Layout } from '../components/layout/Layout'
import { StatsCard } from '../components/admin/StatsCard'
import { VehicleCard } from '../components/admin/VehicleCard'
import { NotificationCard } from '../components/admin/NotificationCard'
import { Button } from '../components/ui/button'
import { Bus, MapPin, AlertTriangle, User, Plus } from 'lucide-react'
import { FleetStats, Vehicle, Notification } from '../types/models'
import { FleetService } from '../services/fleetService'
import { NotificationService } from '../services/notificationService'
import { toast } from 'sonner'
import { IconButton } from '../components/ui/IconButton'

type Tab = 'fleet' | 'notifications'

const Admin = () => {
  const [activeTab, setActiveTab] = useState<Tab>('fleet')
  const [stats, setStats] = useState<FleetStats | null>(null)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [statsData, vehiclesData, notificationsData] = await Promise.all([
        FleetService.getFleetStats(),
        FleetService.getVehicles(),
        NotificationService.getNotifications()
      ])
      setStats(statsData)
      setVehicles(vehiclesData)
      setNotifications(notificationsData)
    } catch (error) {
      toast.error('Erro ao carregar dados')
      console.error('Error loading admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTrack = (vehicle: Vehicle) => {
    toast.info(`Rastreando ${vehicle.code}`)
  }

  const handleSettings = () => {
    toast.info('Configurações')
  }

  return (
    <Layout currentPath="/admin">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-8 sm:mb-12">
          Painel Administrativo
        </h1>

        {/* Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl h-32 sm:h-40 animate-pulse" />
            ))}
          </div>
        ) : (
          stats && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
              <StatsCard
                icon={Bus}
                value={stats.totalVehicles}
                label="Total de veículos"
              />
              <StatsCard
                icon={MapPin}
                value={stats.activeVehicles}
                label="Veículos Rodando"
              />
              <StatsCard
                icon={AlertTriangle}
                value={stats.inactiveVehicles}
                label="Veículos Inativos"
              />
              <StatsCard
                icon={User}
                value={stats.activeDrivers}
                label="Motoristas Ativos"
              />
            </div>
          )
        )}

        {/* Tabs */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Button
            variant={activeTab === 'fleet' ? 'default' : 'outline'}
            onClick={() => setActiveTab('fleet')}
            className={
              activeTab === 'fleet'
                ? 'bg-[#017D97] hover:bg-primary/90 text-sm sm:text-base'
                : 'text-sm sm:text-base'
            }
          >
            Frota
          </Button>
          <Button
            variant={activeTab === 'notifications' ? 'default' : 'outline'}
            onClick={() => setActiveTab('notifications')}
            className={
              activeTab === 'notifications'
                ? 'bg-[#017D97] hover:bg-primary/90 text-sm sm:text-base'
                : 'text-sm sm:text-base'
            }
          >
            Notificações
          </Button>
        </div>

        {/* Content */}
        {activeTab === 'fleet' ? (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
              Controle da Frota
            </h2>
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onTrack={() => handleTrack(vehicle)}
                  onSettings={() => handleSettings()}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <IconButton text="Adicionar ônibus" onClick={() => console.log('clicou')} />
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
              Notificações
            </h2>
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onSettings={() => handleSettings()}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full sm:w-auto">
                <Plus className="w-5 h-5" />
                Adicionar notificação
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Admin
