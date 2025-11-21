import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function verifyAdmin(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error('No token provided');
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    if (payload.role !== 'admin') {
      throw new Error('Unauthorized');
    }

    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}