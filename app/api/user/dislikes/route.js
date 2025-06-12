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
    const dislikes = await prisma.articleLike.findMany({
      where: {
        userId: decoded.userId,
        isLike: false, // 👈 Only where isLike is false
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

    return NextResponse.json({ dislikes });
  } catch (error) {
    console.error('Error fetching disliked articles:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
