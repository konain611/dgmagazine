import HomeLayout2 from "@/components/homeLayout2";
import MessageFromTheCheifPage from "@/components/messageFromTheCheif";
import PopularPosts from "@/components/thirdColumn";

export default function Message() {
    return(
        <div className="bg-gray-100">
              <HomeLayout2
                left={<MessageFromTheCheifPage />}
                right={<PopularPosts />}
              />
            </div>
    )
}