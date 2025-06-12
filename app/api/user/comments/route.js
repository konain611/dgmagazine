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
    const comments = await prisma.comment.findMany({
      where: {
        userId: decoded.userId,
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        content: true,
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

    const formatted = comments.map((c) => ({
      commentId: c.id,
      content: c.content,
      createdAt: c.createdAt,
      article: c.article,
    }));

    return NextResponse.json({ comments: formatted });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
