import { NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function updateCounts(articleId) {
  return {
    likes: await prisma.articleLike.count({ where: { articleId, isLike: true }}),
    dislikes: await prisma.articleLike.count({ where: { articleId, isLike: false }})
  };
}

export async function POST(req, { params }) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await verifyJWT(token);
    if (!user?.userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const articleId = parseInt(params.articleId);
    if (isNaN(articleId)) return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 });

    const existing = await prisma.articleLike.findUnique({
      where: { userId_articleId: { userId: user.userId, articleId } }
    });
    let reaction = null;
    
    if (existing && !existing.isLike) {
      await prisma.articleLike.delete({ where: { userId_articleId: { userId: user.userId, articleId } } });
    } else {
      await prisma.articleLike.upsert({
        where: { userId_articleId: { userId: user.userId, articleId } },
        update: { isLike: false },
        create: { userId: user.userId, articleId, isLike: false }
      });
      reaction = 'dislike';
    }

    const counts = await updateCounts(articleId);
    return NextResponse.json({ ...counts, reaction });

  } catch (error) {
    console.error('Dislike Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}