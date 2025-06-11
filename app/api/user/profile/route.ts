import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { User } from '@prisma/client';

interface JwtPayload {
  userId: string;
}

interface UpdateProfileRequest {
  username: string;
  email: string;
  company?: string | null;
  country?: string | null;
  pictureUrl?: string | null;
  password?: string;
}

export async function GET(req: Request) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyJWT(auth || '') as JwtPayload | null;
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const dbUser = await prisma.user.findUnique({ 
    where: { id: Number(user.userId) } 
  });
  
  return NextResponse.json({ user: dbUser });
}

export async function PATCH(req: Request) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyJWT(auth || '') as JwtPayload | null;
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await req.json() as UpdateProfileRequest;

  const existingUser = await prisma.user.findUnique({
    where: { username: data.username },
  });

  if (existingUser && existingUser.id !== Number(user.userId)) {
    return NextResponse.json(
      { error: 'Username already taken' },
      { status: 409 }
    );
  }

  const updateData: Partial<User> = {
    username: data.username,
    email: data.email,
    company: data.company ?? undefined,
    country: data.country,
    pictureUrl: data.pictureUrl,
  };

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  const updated = await prisma.user.update({
    where: { id: Number(user.userId) },
    data: updateData,
  });

  return NextResponse.json({ user: updated });
}