// Data Layer - Domain Models

export type VehicleStatus = 'active' | 'inactive' | 'maintenance' | 'delayed' | 'early'
export type BusLine = 'CTOR' | 'CT' | 'C01' | 'C02'
export type Campus = 'Mangabeira' | 'Castelo Branco' | 'Rio Tinto' | 'Santa Rita'

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
