import bcrypt from 'bcrypt';
import prisma from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  if (!email || !name || !password) {
    return new NextResponse('Missing info', { status: 400 });
  }
  const encryptedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      encryptedPassword,
    },
  });
  return NextResponse.json(user);
}
