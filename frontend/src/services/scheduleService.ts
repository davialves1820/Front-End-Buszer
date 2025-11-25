// Service Layer - Schedule Microservice
import { Schedule } from '../types/models'

const mockSchedules: Schedule[] = [
  {
    id: '1',
    campus: 'Mangabeira',
    line: 'CTDR',
    departureTime: '8:00h',
    status: 'no-horario',
    hasSchedule: false,
    time: '8:00h'
  },
  {
    id: '2',
    campus: 'Sede',
    line: 'CT',
    departureTime: '8:00h',
    status: 'atrasado',
    hasSchedule: true,
    time: '8:00h'
  },
  {
    id: '3',
    campus: 'Rio Tinto',
    line: 'CTDR',
    departureTime: '8:00h',
    status: 'parado',
    hasSchedule: true,
    time: '8:00h'
  },
  {
    id: '4',
    campus: 'Sede',
    line: 'CT',
    departureTime: '8:00h',
    status: 'adiantado',
    hasSchedule: true,
    time: '8:00h'
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
