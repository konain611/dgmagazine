import HomeLayout2 from "@/components/homeLayout2";
import PopularPosts from "@/components/thirdColumn";
import WritePage from "@/components/writeForUs";

export default function WriteForUs() {
    return(
        <div className="bg-gray-100">
              <HomeLayout2
                left={<WritePage />}
                right={<PopularPosts />}
              />
            </div>
    )
}