import NewsCard from "./mainCard";
import { prisma } from '@/lib/prisma';

export default async function MainArticles() {
    // 1. Define your featured articles by their slugs (easier to manage than IDs)
    const featuredArticleSlugs = [
        "5g-network",
        "btc-mining-competition",
        "are-smart-cities-really-secure",
        "condition-of-greenlands-health-services-critical"
    ];

    // 2. Fetch only the featured articles from database
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

    // 3. Sort articles to match your desired display order
    const sortedArticles = featuredArticleSlugs
        .map(slug => articles.find(article => article.slug === slug))
        .filter(article => article !== undefined) as typeof articles;

    // 4. Return the NewsCards in your specified order
    return (
        <div className="homepage-articles">
            {sortedArticles.map((article) => (
                <NewsCard
                    key={article.id}
                    articleId={article.id}
                    imageSrc={article.imageUrl || '/default-news.jpg'}
                    title={article.title}
                    author={article.author}
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

// Helper function to clean up description
function getShortDescription(content: string): string {
    // Remove markdown formatting if present
    const plainText = content
        .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
        .replace(/#+\s*/g, '') // Remove headings
        .replace(/\*\*/g, '') // Remove bold
        .replace(/\*/g, ''); // Remove italics
    
    return plainText.substring(0, 150) + (plainText.length > 150 ? '...' : '');
}