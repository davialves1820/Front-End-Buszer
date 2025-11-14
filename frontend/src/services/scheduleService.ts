// Service Layer - Schedule Microservice
import { Schedule } from '../types/models'

const mockSchedules: Schedule[] = [
  {
    id: '1',
    campus: 'Mangabeira',
    line: 'CTOR',
    departureTime: '8:00h',
    status: 'active',
    hasSchedule: false
  },
  {
    id: '2',
    campus: 'Castelo Branco',
    line: 'CT',
    departureTime: '8:00h',
    status: 'delayed',
    hasSchedule: true
  },
  {
    id: '3',
    campus: 'Rio Tinto',
    line: 'CTOR',
    departureTime: '8:00h',
    status: 'inactive',
    hasSchedule: true
  },
  {
    id: '4',
    campus: 'Castelo Branco',
    line: 'CT',
    departureTime: '8:00h',
    status: 'early',
    hasSchedule: true
  },
  {
    id: '5',
    campus: 'Mangabeira',
    line: 'CTOR',
    departureTime: '8:00h',
    status: 'active',
    hasSchedule: false
  },
  {
    id: '6',
    campus: 'Castelo Branco',
    line: 'CT',
    departureTime: '8:00h',
    status: 'delayed',
    hasSchedule: true
  },
  {
    id: '7',
    campus: 'Rio Tinto',
    line: 'CTOR',
    departureTime: '8:00h',
    status: 'inactive',
    hasSchedule: true
  },
  {
    id: '8',
    campus: 'Castelo Branco',
    line: 'CT',
    departureTime: '8:00h',
    status: 'active',
    hasSchedule: true
  }
]

export class ScheduleService {
  static async getSchedules(): Promise<Schedule[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockSchedules
  }

  static async getSchedulesByCampus(campus: string): Promise<Schedule[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockSchedules.filter((s) => s.campus === campus)
  }
}
