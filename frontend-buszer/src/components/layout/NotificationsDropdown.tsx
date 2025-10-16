import { useState } from 'react';
import { Bell, Settings, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface NotificationsDropdownProps {
  unreadCount: number;
}

export const NotificationsDropdown = ({ unreadCount }: NotificationsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon"
        className="text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10 w-8 h-8 sm:w-10 sm:h-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-[10px] sm:text-xs">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
            <div className="p-4 border-b border-border bg-card">
              <h3 className="font-semibold text-card-foreground">Configurações de Notificações</h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div 
                className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">Notificações</p>
                    <p className="text-xs text-muted-foreground">Receber notificações do sistema</p>
                  </div>
                </div>
                <div className={cn(
                  "w-10 h-6 rounded-full transition-colors flex items-center",
                  notificationsEnabled ? "bg-primary justify-end" : "bg-muted justify-start"
                )}>
                  <div className="w-4 h-4 bg-white rounded-full mx-1 shadow-sm" />
                </div>
              </div>

              <div 
                className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">Sons</p>
                    <p className="text-xs text-muted-foreground">Ativar sons de notificação</p>
                  </div>
                </div>
                <div className={cn(
                  "w-10 h-6 rounded-full transition-colors flex items-center",
                  soundEnabled ? "bg-primary justify-end" : "bg-muted justify-start"
                )}>
                  <div className="w-4 h-4 bg-white rounded-full mx-1 shadow-sm" />
                </div>
              </div>

              <button 
                className="w-full flex items-center justify-center gap-2 p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Check className="w-4 h-4" />
                Aplicar Configurações
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
