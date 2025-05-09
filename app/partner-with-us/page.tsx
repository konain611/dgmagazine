import HomeLayout2 from "@/components/homeLayout2";
import PartnerPage from "@/components/partnerWithUs";
import PopularPosts from "@/components/thirdColumn";


export default function WriteForUs() {
    return(
        <div className="bg-gray-100">
              <HomeLayout2
                left={<PartnerPage />}
                right={<PopularPosts />}
              />
            </div>
    )
}