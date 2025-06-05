import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '@/lib/auth';

// Create a new comment or reply
export async function POST(req, { params }) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    const user = token ? await verifyJWT(token) : null;
    
    if (!user?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content, parentId } = await req.json();
    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Comment content is required' },
        { status: 400 }
      );
    }

    if (content.length > 1000) {
      return NextResponse.json(
        { error: 'Comment must be less than 1000 characters' },
        { status: 400 }
      );
    }

    const articleId = parseInt(params.articleId);
    if (isNaN(articleId)) {
      return NextResponse.json(
        { error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    // If parentId is provided, verify that the parent comment exists and belongs to the same article
    let parentComment = null;
    if (parentId) {
      parentComment = await prisma.comment.findUnique({
        where: { id: parentId },
      });
      if (!parentComment || parentComment.articleId !== articleId) {
        return NextResponse.json(
          { error: 'Invalid parent comment' },
          { status: 400 }
        );
      }
    }

    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        articleId,
        userId: user.userId,
        parentId: parentId || null,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json({
      comment: {
        id: comment.id,
        content: comment.content,
        user: { id: comment.user.id, username: comment.user.username },
        parentId: comment.parentId,
        createdAt: comment.createdAt.toISOString(),
        replies: [],
      },
    });
  } catch (error) {
    console.error('Comment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Fetch all top-level comments with their replies
export async function GET(req, { params }) {
  try {
    const articleId = parseInt(params.articleId);
    if (isNaN(articleId)) {
      return NextResponse.json(
        { error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    const comments = await prisma.comment.findMany({
      where: { articleId, parentId: null },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        replies: {
          orderBy: { createdAt: 'asc' },
          include: {
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      comments: comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        user: { id: comment.user.id, username: comment.user.username },
        parentId: comment.parentId,
        createdAt: comment.createdAt.toISOString(),
        replies: comment.replies.map((reply) => ({
          id: reply.id,
          content: reply.content,
          user: { id: reply.user.id, username: reply.user.username },
          parentId: reply.parentId,
          createdAt: reply.createdAt.toISOString(),
        })),
      })),
    });
  } catch (error) {
    console.error('Get comments error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
