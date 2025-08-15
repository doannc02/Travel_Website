import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Trong thực tế, bạn sẽ verify JWT token
    // Đây là implementation đơn giản cho demo
    if (token === 'admin_demo_token') {
      return NextResponse.json({
        id: '1',
        email: 'admin@travel.com',
        name: 'Admin User',
        role: 'admin',
        permissions: ['read', 'write', 'delete']
      });
    }

    // Kiểm tra token trong database (nếu có)
    // const user = await prisma.user.findFirst({
    //   where: { 
    //     token: token,
    //     role: 'admin'
    //   }
    // });

    // if (!user) {
    //   return NextResponse.json(
    //     { error: 'Invalid token' },
    //     { status: 401 }
    //   );
    // }

    // return NextResponse.json({
    //   id: user.id,
    //   email: user.email,
    //   name: user.name,
    //   role: user.role
    // });

    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 