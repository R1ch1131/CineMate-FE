import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next"; 
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') ?? '0';
    const size = searchParams.get('size') ?? '20';
    
    const session = await getServerSession(authOptions);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(session?.user?.accessToken && {
          'Authorization': `Bearer ${session.user.accessToken}`
        }),
      },
    });

    if (!response.ok) {
      return NextResponse.json({ message: "Backend Error" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const payload = {
      movieId: Number(body.movieId),
      movieTitle: body.movieTitle,
      moviePosterPath: body.moviePosterPath,
      movieReleaseDate: body.movieReleaseDate ? new Date(body.movieReleaseDate).toISOString() : new Date().toISOString(),
      content: body.content,
      rating: Number(body.rating),
      isSpoiler: Boolean(body.isSpoiler),
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.user.accessToken}` 
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json({ message: "Backend error", details: errorData }, { status: response.status });
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}