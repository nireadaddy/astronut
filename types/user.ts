export interface User {
  id: string;
  name: string;
  email: string;
  birthData: BirthData;
  settings: UserSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface BirthData {
  date: Date;
  time: string;
  place: string;
  zodiacSign: string;
  ascendant?: string;
  moonSign?: string;
}

export interface UserSettings {
  notifications: boolean;
  language: 'th' | 'en';
  timezone: string;
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  content: string;
  isRead: boolean;
  createdAt: Date;
}

export type NotificationType =
  | 'daily_reading'
  | 'special_event'
  | 'compatibility'
  | 'transit_alert'
  | 'system';
