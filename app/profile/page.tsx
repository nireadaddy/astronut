'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Calendar, MapPin, Clock, Edit2 } from 'lucide-react';
import type { User as UserType } from '@/types';

export default function UserProfile() {
  const [user, setUser] = useState<UserType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Fetch user data
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user');
      if (!response.ok) throw new Error('Failed to fetch user data');
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-lg border-0 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">ข้อมูลส่วนตัว</h2>
          <Button
            variant="ghost"
            className="text-white"
            onClick={() => setIsEditing(!isEditing)}
            disabled={isSaving}
          >
            <Edit2 className="w-4 h-4 mr-2" />
            {isEditing ? 'ยกเลิก' : 'แก้ไข'}
          </Button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-purple-300" />
            {isEditing ? (
              <Input
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="bg-white/20 text-white"
              />
            ) : (
              <p className="text-white">{user.name}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-purple-300" />
            <p className="text-white">
              {new Date(user.birthData.date).toLocaleDateString('th-TH')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-purple-300" />
            <p className="text-white">{user.birthData.time}</p>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-purple-300" />
            {isEditing ? (
              <Input
                value={user.birthData.place}
                onChange={(e) =>
                  setUser({
                    ...user,
                    birthData: { ...user.birthData, place: e.target.value },
                  })
                }
                className="bg-white/20 text-white"
              />
            ) : (
              <p className="text-white">{user.birthData.place}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end mt-6">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-purple-500 to-blue-500"
            >
              {isSaving ? 'กำลังบันทึก...' : 'บันทึก'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
