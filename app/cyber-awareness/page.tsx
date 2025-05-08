import CyberAwarenessPage from "@/components/cyberAwareness";
import HomeLayout2 from "@/components/homeLayout2";
import PopularPosts from "@/components/thirdColumn";

export default function CyberAwareness() {
    return(
        <div className="bg-gray-100">
              <HomeLayout2
                left={<CyberAwarenessPage />}
                right={<PopularPosts />}
              />
            </div>
    )
}