import { NextResponse } from 'next/server';
import openai from '@/lib/openai';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zodiacSign = searchParams.get('zodiacSign');

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert Uranian astrology AI assistant. 
          Generate daily horoscope readings in Thai language.
          Focus on specific planetary influences and practical advice.
          Structure the response in these sections:
          1. ดวงดาวประจำวัน (Daily Planetary Influences)
          2. การงานและการเงิน (Career & Finance)
          3. ความรักและความสัมพันธ์ (Love & Relationships)
          4. สุขภาพและความเป็นอยู่ (Health & Wellbeing)
          5. คำแนะนำประจำวัน (Daily Advice)`,
        },
        {
          role: 'user',
          content: `สร้างคำพยากรณ์ประจำวันสำหรับ${zodiacSign || 'ทุกราศี'}
          วันที่: ${new Date().toLocaleDateString('th-TH')}
          
          กรุณาวิเคราะห์ดวงประจำวันโดยละเอียด พร้อมคำแนะนำที่นำไปใช้ได้จริง`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const reading = completion.choices[0].message.content;

    return NextResponse.json({
      success: true,
      reading: parseDaily(reading),
    });
  } catch (error) {
    console.error('Error generating daily reading:', error);
    return NextResponse.json(
      { error: 'Failed to generate daily reading' },
      { status: 500 }
    );
  }
}

function parseDaily(reading: string) {
  const sections = reading.split(/\d+\./);

  return {
    planetary: sections[1]?.trim(),
    careerFinance: sections[2]?.trim(),
    loveRelationships: sections[3]?.trim(),
    healthWellbeing: sections[4]?.trim(),
    advice: sections[5]?.trim(),
  };
}
