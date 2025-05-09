import AdvertisePage from "@/components/advertiseWithUs";
import HomeLayout2 from "@/components/homeLayout2";
import PopularPosts from "@/components/thirdColumn";


export default function WriteForUs() {
    return(
        <div className="bg-gray-100">
              <HomeLayout2
                left={<AdvertisePage />}
                right={<PopularPosts />}
              />
            </div>
    )
}