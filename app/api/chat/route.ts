import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const RATE_LIMIT = 10; // messages per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

const SYSTEM_PROMPT = `You are an expert on minimalist design and contemporary art. You have deep knowledge about:

- The minimalist art movement of the 1960s-70s and its contemporary resurgence
- Donald Judd: His "Specific Objects" (1964), geometric forms in industrial materials, and theory of autonomous art objects without compositional hierarchy
- Dan Flavin: Pioneering use of fluorescent light as artistic medium, transforming commercial materials into transcendent spatial experiences
- Agnes Martin: Ethereal grids and geometric compositions creating meditative spaces, hand-drawn lines proving simplicity contains infinite depth
- Sol LeWitt: Bridging minimalism and conceptual art, famous for "The idea becomes a machine that makes the art," creating 1,000+ wall drawings as instructions executed by others
- MoMA's 2025 Soho store renovation exemplifying contemporary minimalist principles
- Core principles: Simplicity (revealing essential form), Functionality (form follows function), Clarity (precision and honesty in materials)
- Contemporary relevance: addressing complexity with clarity, sustainability through material consciousness, warmth through considered imperfection

Engage in thoughtful, insightful conversations about minimalist design philosophy, art history, and contemporary applications. Be conversational but knowledgeable. Keep responses concise and focused.`;

export async function POST(req: NextRequest) {
  try {
    // Get auth token from headers
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // For simplicity, we'll use a basic auth check
    // In production, you'd verify the Firebase token properly
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Simple rate limiting using user's IP as identifier
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const rateLimitDoc = doc(db, 'rateLimits', ip);
    const rateLimitData = await getDoc(rateLimitDoc);

    const now = Date.now();
    let messageCount = 0;
    let windowStart = now;

    if (rateLimitData.exists()) {
      const data = rateLimitData.data();
      windowStart = data.windowStart?.toMillis() || now;
      messageCount = data.count || 0;

      // Reset if window expired
      if (now - windowStart > RATE_LIMIT_WINDOW) {
        messageCount = 0;
        windowStart = now;
      }
    }

    // Check rate limit
    if (messageCount >= RATE_LIMIT) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const responseMessage = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    // Update rate limit
    await setDoc(rateLimitDoc, {
      count: messageCount + 1,
      windowStart: new Date(windowStart),
      lastUpdated: serverTimestamp(),
    });

    return NextResponse.json({ message: responseMessage });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
