import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = searchParams.get('page') ?? '0';
    const size = searchParams.get('size') ?? '20';

    if (!query) return NextResponse.json([]);

    const targetUrl = `${process.env.NEXT_PUBLIC_API_URL}/movies/search?query=${encodeURIComponent(query)}&page=${page}&size=${size}`;

    console.log('Sending request to:', targetUrl);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); 

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      cache: 'no-store' 
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend Error:', response.status, errorText);
      return NextResponse.json({ error: 'Backend error' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error('Search API: Backend timeout (запрос шел слишком долго)');
      return NextResponse.json({ error: 'Timeout' }, { status: 504 });
    }
    console.error('Search API Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}