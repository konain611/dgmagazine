import { NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req, { params }) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    const user = token ? await verifyJWT(token) : null;
    const articleId = parseInt(params.articleId);

    if (!user?.userId) {
      return NextResponse.json({ reaction: null });
    }

    const reaction = await prisma.articleLike.findUnique({
      where: { userId_articleId: { userId: user.userId, articleId } },
      select: { isLike: true }
    });

    return NextResponse.json({
      reaction: reaction ? (reaction.isLike ? 'like' : 'dislike') : null
    });

  } catch (error) {
    console.error('Reaction fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}