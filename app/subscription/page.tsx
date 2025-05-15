import HomeLayout2 from "@/components/homeLayout2";
import PopularPosts from "@/components/secondColumn";
import SubscriptionPage from "@/components/subscription";

export default function Subscription() {
    return(
        <div className="bg-gray-100">
              <HomeLayout2
                left={<SubscriptionPage />}
                right={<PopularPosts />}
              />
            </div>
    )
}