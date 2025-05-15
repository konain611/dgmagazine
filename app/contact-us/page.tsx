import ContactPage from "@/components/contactUs";
import HomeLayout2 from "@/components/homeLayout2";
import PopularPosts from "@/components/thirdColumn";

export default function ContactUs() {
    return(
        <div className="bg-gray-100">
              <HomeLayout2
                left={<ContactPage />}
                right={<PopularPosts />}
              />
            </div>
    )
}