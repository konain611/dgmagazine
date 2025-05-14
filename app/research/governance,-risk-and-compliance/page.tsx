import HomeLayout from "@/components/homeLayout";
import PopularPosts from "@/components/secondColumn";
import RecentWidgets from "@/components/thirdColumn";

export default function GovernanceRiskCompliance() {
    return (
        <div className="bg-gray-100">
            <HomeLayout
                left={
                <div className="text-center bg-white px-5 py-4 text-2xl shadow-md text-gray-900">
                    All Posts in: <b>Governance, Risks, & Compliance</b>
                </div>

                }
                middle={<PopularPosts />}
                right={<RecentWidgets />}
            />
        </div>
    );
}