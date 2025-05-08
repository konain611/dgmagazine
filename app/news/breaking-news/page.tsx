import BreakingNewsPage from "@/components/breakingNews";
import HomeLayout2 from "@/components/homeLayout2";
import PopularPosts from "@/components/thirdColumn";

export default function BreakingNews() {
    return(
        <div className="bg-gray-100">
              <HomeLayout2
                left={<BreakingNewsPage />}
                right={<PopularPosts />}
              />
            </div>
    )
}