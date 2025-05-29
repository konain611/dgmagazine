import HomeLayout2 from '@/components/homeLayout2';
import Article from '@/components/Article';
import PopularPosts from '@/components/secondColumn';

export default async function ArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  
  return (
    <div className='bg-gray-100 text-gray-900'>
      <HomeLayout2 
        left={<Article slug={resolvedParams.slug} />}
        right={<PopularPosts />}
      />
    </div>
  );
}