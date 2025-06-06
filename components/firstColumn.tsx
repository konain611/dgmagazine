import NewsCard from "./mainCard";
import { prisma } from '@/lib/prisma';

export default async function MainArticles() {
    
    
    const featuredArticleSlugs = [
        "bitcoin-in-pakistan",
        "5g-network",
        "btc-mining-competition",
        "condition-of-greenlands-health-services-critical"
    ];



    const articles = await prisma.article.findMany({
        where: { 
            slug: { in: featuredArticleSlugs } 
        },
        include: {
            likes: {
                where: { isLike: true },
                select: { id: true }
            },
            comments: {
                select: { id: true }
            },
            downloads: {
                select: { id: true }
            }
        }
    });

    const sortedArticles = featuredArticleSlugs
        .map(slug => articles.find(article => article.slug === slug))
        .filter(article => article !== undefined) as typeof articles;

    return (
        <div className="homepage-articles">
            {sortedArticles.map((article) => (
                <NewsCard
                    key={article.id}
                    articleId={article.id}
                    imageSrc={article.imageUrl || '/default-news.jpg'}
                    title={article.title}
                    author={article.author.toUpperCase()}
                    shortDescription={getShortDescription(article.content)}
                    publishDate={article.createdAt}
                    views={article.downloads.length}
                    commentsCount={article.comments.length}
                    likesCount={article.likes.length}
                    href={`/articles/${article.slug}`}
                />
            ))}
        </div>
    )
}

function getShortDescription(content: string): string {
    const plainText = content
        .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
        .replace(/#+\s*/g, '') // Remove headings
        .replace(/\*\*/g, '') // Remove bold
        .replace(/\*/g, ''); // Remove italics
    
    return plainText.substring(0, 150) + (plainText.length > 150 ? '...' : '');
}