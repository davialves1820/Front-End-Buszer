import { Bus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { NotificationService } from '@/services/notificationService';
import { NotificationsDropdown } from '../layout/NotificationsDropdown';
import buszer_icon from '../../assets/img/Buszer_icon.png';

interface HeaderProps {
  currentPath?: string;
}

export const Header = ({ currentPath = '/' }: HeaderProps) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    NotificationService.getUnreadCount().then(setUnreadCount);
  }, []);

  const isActive = (path: string) => currentPath === path;

  return (
    <header className="bg-primary border-b border-primary/10 sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity">
            <img
              src={buszer_icon}
              alt="Buszer Logo"
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
            />
            <span className="text-lg sm:text-xl font-semibold hidden sm:inline">Buszer</span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-4">
            <Link to="/">
              <Button 
                variant={isActive('/') ? 'secondary' : 'ghost'} 
                size="sm"
                className={isActive('/') ? 'text-xs sm:text-sm' : 'text-xs sm:text-sm text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10'}
              >
                INÍCIO
              </Button>
            </Link>
            <Link to="/schedules">
              <Button 
                variant={isActive('/schedules') ? 'secondary' : 'ghost'}
                size="sm"
                className={isActive('/schedules') ? 'text-xs sm:text-sm' : 'text-xs sm:text-sm text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10'}
              >
                CIRCULAR
              </Button>
            </Link>
            <Link to="/admin">
              <Button 
                variant={isActive('/admin') ? 'secondary' : 'ghost'}
                size="sm"
                className={isActive('/admin') ? 'text-xs sm:text-sm' : 'text-xs sm:text-sm text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10'}
              >
                {isActive('/admin') ? 'SAIR' : 'LOGIN'}
              </Button>
            </Link>
            <NotificationsDropdown unreadCount={unreadCount} />
          </div>
        </nav>
      </div>
    </header>
  );
};
