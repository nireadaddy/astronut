import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { question, readingContext } = await request.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert Uranian astrology AI assistant. 
          Answer questions based on the provided reading context.
          Provide concise but insightful answers in Thai language.`,
        },
        {
          role: 'user',
          content: `Based on this reading context:
          ${JSON.stringify(readingContext)}
          
          Please answer this question:
          ${question}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({
      success: true,
      answer: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error answering question:', error);
    return NextResponse.json(
      { error: 'Failed to answer question' },
      { status: 500 }
    );
  }
}
