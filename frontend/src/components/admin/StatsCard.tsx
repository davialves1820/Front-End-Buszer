import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  icon: LucideIcon
  value: number
  label: string
}

export const StatsCard = ({ icon: Icon, value, label }: StatsCardProps) => {
  return (
    <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border flex flex-col items-center text-center hover:shadow-md transition-shadow">
      <Icon
        className="w-8 h-8 sm:w-12 sm:h-12 mb-2 sm:mb-4 text-foreground"
        strokeWidth={1.5}
      />
      <div className="text-xl sm:text-3xl font-bold text-card-foreground mb-1">
        {value}
      </div>
      <div className="text-xs sm:text-sm text-muted-foreground">{label}</div>
    </div>
  )
}
