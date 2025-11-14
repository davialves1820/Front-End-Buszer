import { Vehicle } from '../../types/models'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Settings } from 'lucide-react'
import { cn } from '../../lib/utils'

interface VehicleCardProps {
  vehicle: Vehicle
  onTrack: () => void
  onSettings: () => void
}

const statusConfig = {
  active: { label: 'Ativo', className: 'bg-secondary text-secondary-foreground' },
  delayed: { label: 'Atrasado', className: 'bg-destructive text-destructive-foreground' },
  early: { label: 'Adiantado', className: 'bg-success text-success-foreground' },
  inactive: { label: 'Inativo', className: 'bg-muted text-muted-foreground' },
  maintenance: { label: 'Manutenção', className: 'bg-muted text-muted-foreground' }
}

export const VehicleCard = ({ vehicle, onTrack, onSettings }: VehicleCardProps) => {
  const status = statusConfig[vehicle.status]

  return (
    <div className="bg-card rounded-xl p-4 sm:p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        <div className="bg-[#017D97] text-secondary-foreground rounded-lg w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-lg sm:text-xl font-bold flex-shrink-0">
          {vehicle.code}
        </div>

        <div className="flex-1 min-w-0 w-full sm:w-auto">
          <div className="font-semibold text-card-foreground mb-1 text-sm sm:text-base">
            {vehicle.route.from} - {vehicle.route.to}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">
            Motorista: {vehicle.driver?.name || 'Não atribuído'}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-between sm:justify-end">
          <Badge className={cn('whitespace-nowrap text-xs', status.className)}>
            {status.label}
          </Badge>
          <div className="flex gap-2">
            <Button
              onClick={onTrack}
              className="bg-[#90EE90] hover:bg-[#90EE90] text-[#03300B] text-xs sm:text-sm"
              size="sm"
            >
              Rastrear
            </Button>
            <Button
              onClick={onSettings}
              variant="ghost"
              size="icon"
              className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
