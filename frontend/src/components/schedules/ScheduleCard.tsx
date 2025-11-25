import { Schedule } from '../../types/models'
import { Button } from '../../components/ui/button'
import { Clock, Circle } from 'lucide-react'
import { cn } from '../../lib/utils'
import { StatusBadge } from '../../components/schedules/statusBadge'

interface ScheduleCardProps {
  schedule: Schedule
  onTrack: () => void
  className?: string
  style?: React.CSSProperties
}

export const ScheduleCard = ({
  schedule,
  onTrack,
  className,
  style
}: ScheduleCardProps) => {
  return (
    <div
      className={cn(
        'bg-card rounded-xl p-6 shadow-sm border border-border hover-lift hover-glow animate-slide-up group',
        className
      )}
      style={style}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            Campus {schedule.campus}
          </h3>

          {/* Linha */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Circle className="h-3 w-3 fill-current transition-transform group-hover:scale-110" />
            <span>{schedule.line}</span>
          </div>
        </div>

        {/* Status automatizado */}
        <StatusBadge status={schedule.status} />
      </div>

      {/* Horário */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>Partida: {schedule.departureTime}</span>
        </div>
      </div>

      {/* Botão */}
      <Button
        onClick={onTrack}
        className="w-full bg-success hover:bg-success/90 text-success-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg"
      >
        Rastrear
      </Button>
    </div>
  )
}
