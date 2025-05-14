import HomeLayout from "@/components/homeLayout";
import PopularPosts from "@/components/secondColumn";
import RecentWidgets from "@/components/thirdColumn";

export default function CyberCareerGuidance() {
    return (
        <div className="bg-gray-100">
            <HomeLayout
                left={
                <div className="text-center bg-white px-5 py-4 text-2xl shadow-md text-gray-900">
                    All Posts in: <b>Cyber Career Guidance</b>
                </div>

                }
                middle={<PopularPosts />}
                right={<RecentWidgets />}
            />
        </div>
    );
}