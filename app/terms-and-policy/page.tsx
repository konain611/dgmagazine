import HomeLayout2 from "@/components/homeLayout2";
import PolicyPage from "@/components/policy";
import PopularPosts from "@/components/thirdColumn";

export default function TermsAndPoliicy() {
    return(
        <div className="bg-gray-100">
              <HomeLayout2
                left={<PolicyPage />}
                right={<PopularPosts />}
              />
            </div>
    )
}