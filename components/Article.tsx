// import ReactMarkdown from 'react-markdown';
import Image from "next/image";
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
            imageUrl: true, // Ensure imageUrl is selected
        },
    });

    const likesCount = await prisma.articleLike.count({
        where: { articleId: article.id, isLike: true },
    });
    const dislikesCount = await prisma.articleLike.count({
        where: { articleId: article.id, isLike: false },
    });

    const comments = await prisma.comment.findMany({
        where: { articleId: article.id },
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { username: true } } },
    });

    return (
        <div className="max-w-[95%] mx-auto p-6 bg-white">
            {/* Add image at top */}
            {article.imageUrl && (
                <div className="mb-6">
                    <Image
                        src={article.imageUrl}
                        alt={article.title}
                        width={800}         // Optional fixed width, can be responsive
                        height={0}          // Use 0 if you want Next.js to ignore static height
                        className="w-full h-auto rounded-lg object-contain"
                    />
                </div>
            )}


            {/* Center the heading */}
            <h1 className="text-3xl font-bold text-center my-10">{article.title}</h1>

            <p className="whitespace-pre-line">{article.content}</p>


            <ArticleInteractionPanel
                articleId={article.id}
                initialLikes={likesCount}
                initialDislikes={dislikesCount}
                comments={comments.map((c): {
                    id: number;
                    content: string;
                    user: { username: string };
                    createdAt: string;
                } => ({
                    id: c.id,
                    content: c.content,
                    user: { username: c.user.username },
                    createdAt: c.createdAt.toISOString(),
                }))}
            />
        </div>
    )
}