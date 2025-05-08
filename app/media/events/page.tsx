import EventsPage from "@/components/events";
import HomeLayout2 from "@/components/homeLayout2";
import PopularPosts from "@/components/thirdColumn";

export default function Events() {
    return(
        <div className="bg-gray-100">
              <HomeLayout2
                left={<EventsPage />}
                right={<PopularPosts />}
              />
            </div>
    )
}