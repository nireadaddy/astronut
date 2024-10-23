import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { addDays, addMonths } from 'date-fns';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Request body:', body);

    // Calculate base scores
    const scores = {
      career: Math.floor(Math.random() * 30) + 65, // 65-95
      love: Math.floor(Math.random() * 30) + 65,
      finance: Math.floor(Math.random() * 30) + 65,
      health: Math.floor(Math.random() * 30) + 65,
    };

    const completion = await openai.chat.completions.create({
      model: 'gpt-4', // Using GPT-4 for better accuracy
      messages: [
        {
          role: 'system',
          content: `คุณคือนักโหราศาสตร์ยูเรเนียนผู้เชี่ยวชาญ ให้วิเคราะห์ดวงชะตาตามหัวข้อที่กำหนดอย่างละเอียด
          
          กฎในการวิเคราะห์:
          1. วิเคราะห์เฉพาะด้านที่เกี่ยวข้องกับแต่ละหัวข้อเท่านั้น
          2. ให้คำแนะนำที่เป็นรูปธรรมและนำไปใช้ได้จริง
          3. อธิบายเหตุผลว่าทำไมจึงได้คะแนนในระดับนั้นๆ
          
          โครงสร้างการวิเคราะห์:
          1. ด้านการงาน (${scores.career}/100):
          - สถานการณ์ปัจจุบัน
          - โอกาสและความท้าทาย
          - คำแนะนำเฉพาะด้าน
          
          2. ด้านความรัก (${scores.love}/100):
          - สถานะความสัมพันธ์
          - จังหวะและโอกาส
          - คำแนะนำเฉพาะด้าน
          
          3. ด้านการเงิน (${scores.finance}/100):
          - สถานะการเงิน
          - โอกาสและความเสี่ยง
          - คำแนะนำด้านการเงิน
          
          4. ด้านสุขภาพ (${scores.health}/100):
          - สภาวะสุขภาพ
          - จุดที่ต้องระวัง
          - คำแนะนำด้านสุขภาพ
          
          5. การพยากรณ์:
          - 7 วันข้างหน้า: เหตุการณ์สำคัญและคำแนะนำ
          - 1 เดือนข้างหน้า: แนวโน้มและโอกาส
          - 3 เดือนข้างหน้า: การเปลี่ยนแปลงที่ควรเตรียมตัว
          - 6 เดือนข้างหน้า: เป้าหมายและแผนระยะยาว`,
        },
        {
          role: 'user',
          content: `วิเคราะห์ดวงชะตาสำหรับ:
          ชื่อ: ${body.name}
          วันเกิด: ${body.birthDate}
          เวลาเกิด: ${body.birthTime}
          สถานที่เกิด: ${body.birthPlace}
          
          กรุณาวิเคราะห์แต่ละด้านตามโครงสร้างที่กำหนด โดยให้รายละเอียดที่เฉพาะเจาะจงและนำไปใช้ได้จริง`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });

    const content = completion.choices[0].message.content;
    const sections = content.split(/\d+\.\s+/);

    // Process the response
    const reading = {
      powerScore: Math.round(
        (scores.career + scores.love + scores.finance + scores.health) / 4
      ),
      overall: sections[0] || '',
      aspects: {
        career: {
          score: scores.career,
          text: sections[1]?.trim() || '',
        },
        love: {
          score: scores.love,
          text: sections[2]?.trim() || '',
        },
        finance: {
          score: scores.finance,
          text: sections[3]?.trim() || '',
        },
        health: {
          score: scores.health,
          text: sections[4]?.trim() || '',
        },
      },
      dateRanges: {
        week: {
          startDate: new Date().toISOString(),
          endDate: addDays(new Date(), 7).toISOString(),
          description: sections[5]?.trim() || '',
          aspects: {
            career: { score: scores.career, text: '' },
            love: { score: scores.love, text: '' },
            finance: { score: scores.finance, text: '' },
            health: { score: scores.health, text: '' },
          },
        },
        month: {
          startDate: new Date().toISOString(),
          endDate: addMonths(new Date(), 1).toISOString(),
          description: sections[6]?.trim() || '',
          aspects: {
            career: { score: scores.career, text: '' },
            love: { score: scores.love, text: '' },
            finance: { score: scores.finance, text: '' },
            health: { score: scores.health, text: '' },
          },
        },
        threeMonths: {
          startDate: new Date().toISOString(),
          endDate: addMonths(new Date(), 3).toISOString(),
          description: sections[7]?.trim() || '',
          aspects: {
            career: { score: scores.career, text: '' },
            love: { score: scores.love, text: '' },
            finance: { score: scores.finance, text: '' },
            health: { score: scores.health, text: '' },
          },
        },
        sixMonths: {
          startDate: new Date().toISOString(),
          endDate: addMonths(new Date(), 6).toISOString(),
          description: sections[8]?.trim() || '',
          aspects: {
            career: { score: scores.career, text: '' },
            love: { score: scores.love, text: '' },
            finance: { score: scores.finance, text: '' },
            health: { score: scores.health, text: '' },
          },
        },
      },
    };

    // Validate response content
    if (
      !reading.aspects.career.text ||
      !reading.aspects.love.text ||
      !reading.aspects.finance.text ||
      !reading.aspects.health.text
    ) {
      throw new Error('ข้อมูลไม่สมบูรณ์ กรุณาลองใหม่อีกครั้ง');
    }

    return NextResponse.json({
      success: true,
      reading,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'การวิเคราะห์ล้มเหลว กรุณาลองใหม่อีกครั้ง',
      },
      {
        status: 500,
      }
    );
  }
}
