import Image from 'next/image';
import ArticleInteractionPanel from '@/components/ArticleInteractionPanel';
import { prisma } from '@/lib/prisma';

interface Props {
  slug: string;
}

export default async function Article({ slug }: Props) {
  const article = await prisma.article.findUniqueOrThrow({
    where: { slug },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      author: true,
      createdAt: true,
      imageUrl: true,
    },
  });

  const likesCount = await prisma.articleLike.count({
    where: { articleId: article.id, isLike: true },
  });
  const dislikesCount = await prisma.articleLike.count({
    where: { articleId: article.id, isLike: false },
  });

  const comments = await prisma.comment.findMany({
    where: { articleId: article.id, parentId: null },
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { id: true, username: true } },
      replies: {
        orderBy: { createdAt: 'asc' },
        include: { user: { select: { id: true, username: true } } },
      },
    },
  });

  return (
    <div className="max-w-[95%] mx-auto p-6 bg-white">

      <div className="text-sm text-gray-500 mb-5 text-center">
        <span>Written By {article.author}</span> | 
        <span className="ml-2">{new Date(article.createdAt).toLocaleDateString()}</span>
      </div>

      {article.imageUrl && (
        <div className="mb-6">
          <Image
            src={article.imageUrl}
            alt={article.title}
            width={800}
            height={0}
            className="w-full h-auto rounded-lg object-contain"
          />
        </div>
      )}

      <h1 className="text-3xl font-bold text-center my-10">{article.title}</h1>

      <div className="text-base font-sans leading-relaxed mx-6">
        {article.content
          .split('\\n')
          .map((paragraph, idx) => (
            <p key={idx} className="mb-4">
              {paragraph}
            </p>
          ))}
      </div>



      <ArticleInteractionPanel
        articleId={article.id}
        initialLikes={likesCount}
        initialDislikes={dislikesCount}
        comments={comments.map((c) => ({
          id: c.id,
          content: c.content,
          user: { id: c.user.id, username: c.user.username },
          parentId: c.parentId,
          createdAt: c.createdAt.toISOString(),
          replies: c.replies.map((r) => ({
            id: r.id,
            content: r.content,
            user: { id: r.user.id, username: r.user.username },
            parentId: r.parentId,
            createdAt: r.createdAt.toISOString(),
            replies: [],
          })),
        }))}
      />
    </div>
  );
}
