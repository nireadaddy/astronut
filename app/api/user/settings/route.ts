import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userSettings = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        notifications: true,
        language: true,
        timezone: true,
        emailNotifications: true,
        pushNotifications: true,
      },
    });

    return NextResponse.json(userSettings);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const updatedSettings = await prisma.user.update({
      where: { id: userId },
      data: {
        notifications: body.notifications,
        language: body.language,
        timezone: body.timezone,
        emailNotifications: body.emailNotifications,
        pushNotifications: body.pushNotifications,
      },
    });

    return NextResponse.json(updatedSettings);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
