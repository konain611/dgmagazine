import HomeLayout2 from "@/components/homeLayout2";
import MediaPage from "@/components/media";
import PopularPosts from "@/components/thirdColumn";

export default function Media() {
    return(
        <div className="bg-gray-100">
              <HomeLayout2
                left={<MediaPage />}
                right={<PopularPosts />}
              />
            </div>
    )
}