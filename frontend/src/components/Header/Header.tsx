import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { useEffect, useState } from 'react'
import { NotificationService } from '../../services/notificationService'
import { NotificationsDropdown } from '../layout/NotificationsDropdown'
import buszer_icon from '../../assets/img/Buszer_icon.png'
import './Header.css'

interface HeaderProps {
  currentPath?: string
}

export const Header = ({ currentPath = '/' }: HeaderProps) => {
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    NotificationService.getUnreadCount().then(setUnreadCount)
  }, [])

  const isActive = (path: string) => currentPath === path

  return (
    <header className="header">
      <div className="header-container">
        <nav className="header-nav">
          <Link to="/" className="header-logo text-white">
            <img src={buszer_icon} alt="Buszer Logo" className="header-icon" />
            <span className="header-title">Buszer</span>
          </Link>

          <div className="header-buttons">
            <Link to="/">
              <Button variant="header" size="sm" active={isActive('/')}>
                INÍCIO
              </Button>
            </Link>
            <Link to="/schedules">
              <Button variant="header" size="sm" active={isActive('/schedules')}>
                CIRCULAR
              </Button>
            </Link>
            {/*<Link to="/admin">
              <Button variant="header" size="sm" active={isActive('/admin')}>
                {isActive('/admin') ? 'SAIR' : 'LOGIN'}
              </Button>
            </Link>*/}
            <NotificationsDropdown unreadCount={unreadCount} />
          </div>
        </nav>
      </div>
    </header>
  )
}
