import HomeLayout2 from "@/components/homeLayout2";
import NewsArchievePage from "@/components/newsArchieve";
import PopularPosts from "@/components/thirdColumn";

export default function NewsArchieve() {
  return (
    <div className="bg-gray-100">
      <HomeLayout2
        left={<NewsArchievePage />}
        right={<PopularPosts />}
      />
    </div>
  )
}