import { NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyJWT(token);

  if (!decoded || !decoded.userId) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    const likes = await prisma.ArticleLike.findMany({
      where: {
        userId: decoded.userId,
        isLike: true,
      },
      orderBy: { createdAt: 'desc' },
      select: {
        createdAt: true,
        article: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json({ likes });
  } catch (error) {
    console.error('Error fetching liked articles:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
