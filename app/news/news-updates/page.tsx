import HomeLayout2 from "@/components/homeLayout2";
import NewsUpdatesPage from "@/components/newsUpdates";
import PopularPosts from "@/components/thirdColumn";

export default function NewsUpdates() {
    return(
        <div className="bg-gray-100">
              <HomeLayout2
                left={<NewsUpdatesPage />}
                right={<PopularPosts />}
              />
            </div>
    )
}