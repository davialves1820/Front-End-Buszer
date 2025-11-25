export type VehicleStatus =
  | 'ativo'
  | 'inativo'
  | 'atrasado'
  | 'adiantado'
  | 'parado'
  | 'no-horario'
export type BusLine = 'CTDR' | 'CT' | 'CI'
export type Campus = 'Mangabeira' | 'Sede' | 'Rio Tinto' | 'Santa Rita'

export interface Vehicle {
  id: string
  code: string
  line: BusLine
  status: VehicleStatus
  driver?: Driver
  route: Route
  location?: Location
  lastUpdate: Date
}

export interface Driver {
  id: string
  name: string
  active: boolean
}

export interface Route {
  id: string
  from: Campus
  to: Campus
  departureTime: string
}

export interface Location {
  lat: number
  lng: number
  speed: number
  heading: number
}

export interface Schedule {
  id: string
  campus: Campus
  line: BusLine
  departureTime: string
  status: VehicleStatus
  hasSchedule: boolean
  time: string
}

export interface Notification {
  id: string
  type: 'info' | 'warning' | 'error' | 'success'
  message: string
  vehicleCode?: string
  timestamp: Date
  read: boolean
}

export interface FleetStats {
  totalVehicles: number
  activeVehicles: number
  inactiveVehicles: number
  activeDrivers: number
}
