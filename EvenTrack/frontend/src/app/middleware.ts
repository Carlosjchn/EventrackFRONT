import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api')) {
    const apiUrl = `http://alexcoding.es:3030${pathname}`; // Construct your backend URL

    const response = await fetch(apiUrl, {
      method: req.method,
      headers: req.headers,
      body: req.body,
    });

    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  }

  return NextResponse.next(); // Continue with normal request flow
};
