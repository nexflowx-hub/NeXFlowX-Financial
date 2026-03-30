import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    const systemPrompt = {
      role: 'system',
      content:
        'You are a helpful assistant for NeXFlowX.tech, a Financial Supply Chain Orchestrator. You help visitors understand the platform\'s capabilities: multi-acquirer payment orchestration, smart routing, real-time monitoring, and European/global coverage. Be concise and professional. Respond in the same language the user writes in.',
    };

    const completion = await zai.chat.completions.create({
      messages: [systemPrompt, ...messages],
    });

    const messageContent = completion.choices[0]?.message?.content;

    if (!messageContent) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: messageContent });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    console.error('Chat API error:', message);
    return NextResponse.json(
      { error: 'Failed to get AI response. Please try again.' },
      { status: 500 }
    );
  }
}
