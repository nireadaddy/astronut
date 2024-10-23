'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Bell, Mail, Globe, Clock } from 'lucide-react';
import type { UserSettings } from '@/types';

export default function NotificationSettings() {
  const [settings, setSettings] = useState<UserSettings>({
    notifications: true,
    language: 'th',
    timezone: 'Asia/Bangkok',
    emailNotifications: true,
    pushNotifications: true,
    theme: 'dark',
  });

  const [isSaving, setIsSaving] = useState(false);

  const updateSettings = async (newSettings: Partial<UserSettings>) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...settings, ...newSettings }),
      });

      if (!response.ok) throw new Error('Failed to update settings');

      setSettings((prev) => ({ ...prev, ...newSettings }));
    } catch (error) {
      console.error('Error updating settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-lg border-0 p-6">
        <h2 className="text-xl font-bold text-white mb-6">การแจ้งเตือน</h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-purple-300" />
              <div>
                <p className="text-white font-medium">การแจ้งเตือนทั้งหมด</p>
                <p className="text-sm text-white/70">
                  เปิด/ปิดการแจ้งเตือนทั้งหมด
                </p>
              </div>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) =>
                updateSettings({ notifications: checked })
              }
              disabled={isSaving}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-purple-300" />
              <div>
                <p className="text-white font-medium">อีเมล</p>
                <p className="text-sm text-white/70">รับการแจ้งเตือนทางอีเมล</p>
              </div>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) =>
                updateSettings({ emailNotifications: checked })
              }
              disabled={isSaving || !settings.notifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-purple-300" />
              <div>
                <p className="text-white font-medium">แจ้งเตือนบนเว็บ</p>
                <p className="text-sm text-white/70">
                  รับการแจ้งเตือนบนเบราว์เซอร์
                </p>
              </div>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked) =>
                updateSettings({ pushNotifications: checked })
              }
              disabled={isSaving || !settings.notifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-purple-300" />
              <div>
                <p className="text-white font-medium">เวลาแจ้งเตือน</p>
                <p className="text-sm text-white/70">
                  ตั้งเวลารับการแจ้งเตือนประจำวัน
                </p>
              </div>
            </div>
            <select
              className="bg-white/20 border-0 text-white rounded-md p-2"
              value={settings.timezone}
              onChange={(e) => updateSettings({ timezone: e.target.value })}
              disabled={isSaving || !settings.notifications}
            >
              <option value="Asia/Bangkok">07:00 น.</option>
              <option value="Asia/Bangkok+1">08:00 น.</option>
              <option value="Asia/Bangkok+2">09:00 น.</option>
            </select>
          </div>
        </div>
      </Card>
    </div>
  );
}
