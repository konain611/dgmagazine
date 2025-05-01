import HomeLayout from "@/components/homeLayout";
import MainArticles from "@/components/mainArticle";
import PopularPosts from "@/components/thirdColumn";
import RecentWidgets from "@/components/secondColumn";

export default function HomePage() {
  return (
    <HomeLayout
      left={<MainArticles />}
      middle={<RecentWidgets />}
      right={<PopularPosts />}
    />
  );
}
