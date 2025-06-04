import HomeLayout from "@/components/homeLayout";
import MainArticles from "@/components/firstColumn";
import PopularPosts from "@/components/thirdColumn";
import RecentWidgets from "@/components/secondColumn";

export default function HomePage() {
  return (
    <div className="bg-gray-100">
      <HomeLayout
        left={<MainArticles />}
        middle={<RecentWidgets />}
        right={<PopularPosts />}
      />
    </div>
  );
}

// // Add this at the bottom of your page.tsx
// export async function generateStaticParams() {
//   return []; // Return empty array if you don't have static paths
// }
