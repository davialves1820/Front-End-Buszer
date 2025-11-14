import { Notification } from '@/types/models';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface NotificationCardProps {
  notification: Notification;
  onSettings: () => void;
}

const typeConfig = {
  success: 'bg-success/10 border-success/20',
  error: 'bg-destructive/10 border-destructive/20',
  warning: 'bg-warning/10 border-warning/20',
  info: 'bg-secondary/10 border-secondary/20',
};

const dotConfig = {
  success: 'bg-success',
  error: 'bg-destructive',
  warning: 'bg-warning',
  info: 'bg-secondary',
};

export const NotificationCard = ({ notification, onSettings }: NotificationCardProps) => {
  return (
    <div className={cn(
      "bg-card rounded-xl p-4 sm:p-6 shadow-sm border hover:shadow-md transition-shadow",
      typeConfig[notification.type]
    )}>
      <div className="flex items-start gap-3 sm:gap-4">
        <div className={cn("w-3 h-3 rounded-full flex-shrink-0 mt-1.5", dotConfig[notification.type])} />
        
        <div className="flex-1 min-w-0">
          <p className="text-card-foreground font-medium mb-1 text-sm sm:text-base">{notification.message}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {formatDistanceToNow(notification.timestamp, { addSuffix: true, locale: ptBR })}
          </p>
        </div>

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
  );
};
