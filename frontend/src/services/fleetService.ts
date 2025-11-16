// Service Layer - Fleet Microservice
import { Vehicle, FleetStats } from '../types/models'

// Mock data for demonstration
const mockVehicles: Vehicle[] = [
  {
    id: '1',
    code: 'C01',
    line: 'C01',
    status: 'active',
    driver: { id: '1', name: 'Pedro Falconi', active: true },
    route: { id: '1', from: 'Mangabeira', to: 'Castelo Branco', departureTime: '8:00h' },
    lastUpdate: new Date()
  },
  {
    id: '2',
    code: 'C02',
    line: 'C02',
    status: 'maintenance',
    driver: { id: '2', name: 'Davi Alves', active: true },
    route: { id: '2', from: 'Santa Rita', to: 'Castelo Branco', departureTime: '8:00h' },
    lastUpdate: new Date()
  }
]

export class FleetService {
  static async getFleetStats(): Promise<FleetStats> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))
/*
    const activeVehicles = mockVehicles.filter(
      (v) => v.status === 'active' || v.status === 'delayed' || v.status === 'early'
    ).length
    const inactiveVehicles = mockVehicles.filter(
      (v) => v.status === 'inactive' || v.status === 'maintenance'
    ).length
    const activeDrivers = mockVehicles.filter((v) => v.driver?.active).length
*/
    return {
      totalVehicles: 4,
      activeVehicles: 2,
      inactiveVehicles: 2,
      activeDrivers: 2
    }
  }

  static async getVehicles(): Promise<Vehicle[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockVehicles
  }

  static async getVehicleById(id: string): Promise<Vehicle | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockVehicles.find((v) => v.id === id)
  }

  static async updateVehicleStatus(id: string, status: Vehicle['status']): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const vehicle = mockVehicles.find((v) => v.id === id)
    if (vehicle) {
      vehicle.status = status
    }
  }
}
