import { Schedule } from '@/types/models';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScheduleCardProps {
  schedule: Schedule;
  onTrack: () => void;
}

const statusConfig = {
  active: { label: 'Ativo', className: 'bg-secondary text-secondary-foreground' },
  delayed: { label: 'Atrasado', className: 'bg-destructive text-destructive-foreground' },
  early: { label: 'Adiantado', className: 'bg-success text-success-foreground' },
  inactive: { label: 'Inativo', className: 'bg-muted text-muted-foreground' },
  maintenance: { label: 'Manutenção', className: 'bg-muted text-muted-foreground' },
};

const lineStatusConfig = {
  true: { label: 'No horário', className: 'bg-muted text-muted-foreground' },
  false: { label: 'Parado', className: 'bg-muted text-muted-foreground' },
};

export const ScheduleCard = ({ schedule, onTrack }: ScheduleCardProps) => {
  const status = statusConfig[schedule.status];
  const lineStatus = lineStatusConfig[schedule.hasSchedule ? 'true' : 'false'];

  return (
    <div className="bg-card rounded-xl p-4 sm:p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-card-foreground">Campus {schedule.campus}</h3>
        <Badge className={status.className}>
          {status.label}
        </Badge>
      </div>

      <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-3 h-3 rounded-full",
            schedule.hasSchedule ? "bg-muted" : "bg-success"
          )} />
          <span className="text-sm font-medium text-card-foreground">{schedule.line}</span>
          <Badge variant="outline" className={lineStatus.className}>
            {lineStatus.label}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Partida: {schedule.departureTime}</span>
        </div>
      </div>

      <Button 
        onClick={onTrack}
        className="w-full bg-[#90EE90] hover:bg-[#90EE90] text-[#03300B]"
      >
        Rastrear
      </Button>
    </div>
  );
};
