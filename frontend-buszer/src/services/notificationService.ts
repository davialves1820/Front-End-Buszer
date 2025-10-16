// Service Layer - Notification Microservice
import { Notification } from '@/types/models';

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    message: 'O ônibus C02 chegará em 10 minutos!',
    vehicleCode: 'C02',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: '2',
    type: 'error',
    message: 'O ônibus C01 ficará fora de funcionamento durante essa semana!',
    vehicleCode: 'C01',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: false,
  },
];

export class NotificationService {
  static async getNotifications(): Promise<Notification[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockNotifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  static async getUnreadCount(): Promise<number> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockNotifications.filter(n => !n.read).length;
  }

  static async markAsRead(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const notification = mockNotifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  }

  static async createNotification(notification: Omit<Notification, 'id' | 'timestamp'>): Promise<Notification> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newNotification: Notification = {
      ...notification,
      id: String(mockNotifications.length + 1),
      timestamp: new Date(),
    };
    mockNotifications.unshift(newNotification);
    return newNotification;
  }
}
