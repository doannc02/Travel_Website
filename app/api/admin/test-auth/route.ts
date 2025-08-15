import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Lấy token từ header hoặc cookie
    const authHeader = request.headers.get('authorization')?.replace('Bearer ', '');
    const cookieToken = request.cookies.get('admin_token')?.value;
    
    const token = authHeader || cookieToken;

    if (!token) {
      return NextResponse.json(
        { 
          error: 'No token provided',
          headers: Object.fromEntries(request.headers.entries()),
          cookies: Object.fromEntries(request.cookies.getAll().map(c => [c.name, c.value]))
        },
        { status: 401 }
      );
    }

    if (token !== 'admin_demo_token') {
      return NextResponse.json(
        { 
          error: 'Invalid token',
          providedToken: token,
          expectedToken: 'admin_demo_token'
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: 'Authentication successful',
      token: token,
      method: 'GET',
      timestamp: new Date().toISOString(),
      headers: Object.fromEntries(request.headers.entries()),
      cookies: Object.fromEntries(request.cookies.getAll().map(c => [c.name, c.value]))
    });
  } catch (error) {
    console.error('Test auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Lấy token từ header hoặc cookie
    const authHeader = request.headers.get('authorization')?.replace('Bearer ', '');
    const cookieToken = request.cookies.get('admin_token')?.value;
    
    const token = authHeader || cookieToken;

    if (!token) {
      return NextResponse.json(
        { 
          error: 'No token provided',
          body: body,
          headers: Object.fromEntries(request.headers.entries()),
          cookies: Object.fromEntries(request.cookies.getAll().map(c => [c.name, c.value]))
        },
        { status: 401 }
      );
    }

    if (token !== 'admin_demo_token') {
      return NextResponse.json(
        { 
          error: 'Invalid token',
          providedToken: token,
          expectedToken: 'admin_demo_token'
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: 'Authentication successful',
      token: token,
      method: 'POST',
      body: body,
      timestamp: new Date().toISOString(),
      headers: Object.fromEntries(request.headers.entries()),
      cookies: Object.fromEntries(request.cookies.getAll().map(c => [c.name, c.value]))
    });
  } catch (error) {
    console.error('Test auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 