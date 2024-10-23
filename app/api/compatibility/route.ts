import { NextResponse } from 'next/server';
import { anthropic } from '@/lib/anthropic';
import { zodiacCompatibility } from '@/lib/utils/zodiacUtils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sign1, sign2 } = body;

    // Check basic compatibility from predefined rules
    const basicCompatibility = zodiacCompatibility(sign1, sign2);

    // Get detailed analysis from Claude
    const message = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `วิเคราะห์ความเข้ากันระหว่าง ${sign1} และ ${sign2}
        กรุณาวิเคราะห์:
        1. ความเข้ากันด้านความรัก
        2. ความเข้ากันด้านการงาน
        3. ความเข้ากันด้านมิตรภาพ
        4. จุดเด่นและจุดที่ต้องระวัง
        5. คำแนะนำในการปรับตัว`,
        },
      ],
    });

    return NextResponse.json({
      basicCompatibility,
      detailedAnalysis: message.content,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to analyze compatibility' },
      { status: 500 }
    );
  }
}
