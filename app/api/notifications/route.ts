import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { anthropic } from '@/lib/anthropic';

export async function GET(request: Request) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return NextResponse.json({ notifications });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, type } = body;

    // Get user's birth data for personalized notifications
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Generate personalized notification content
    const message = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `สร้างการแจ้งเตือนสำหรับผู้ใช้ราศี${user.zodiacSign}
        ประเภท: ${type}
        วันที่: ${new Date().toISOString()}`,
        },
      ],
    });

    // Save notification
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        content: message.content,
        isRead: false,
      },
    });

    return NextResponse.json({ notification });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}
