import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: 'ativo' | 'inativo' | 'atrasado' | 'adiantado' | 'no-horario' | 'parado'
  className?: string
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  // Normalização automática (scheduler → bus)
  const normalized =
    {
      active: 'ativo',
      inactive: 'inativo',
      delayed: 'atrasado',
      early: 'adiantado',
      maintenance: 'inativo' // mesma cor de inativo
    }[status] || status // se já vier no padrão bus, mantém

  const statusConfig = {
    ativo: {
      label: 'Ativo',
      className: 'bg-secondary text-secondary-foreground'
    },
    inativo: {
      label: 'Inativo',
      className: 'bg-muted text-muted-foreground'
    },
    atrasado: {
      label: 'Atrasado',
      className: 'bg-destructive text-destructive-foreground'
    },
    adiantado: {
      label: 'Adiantado',
      className: 'bg-success text-success-foreground'
    },
    'no-horario': {
      label: 'No horário',
      className: 'bg-accent text-accent-foreground'
    },
    parado: {
      label: 'Parado',
      className: 'bg-muted text-muted-foreground'
    }
  }

  const config = statusConfig[normalized]

  return (
    <span
      className={cn(
        'px-3 py-1 rounded-full text-xs font-medium inline-block transition-all duration-300 hover:scale-105 animate-scale-in',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}
