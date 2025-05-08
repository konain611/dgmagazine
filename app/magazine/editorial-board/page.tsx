import EditorialBoardPage from "@/components/editorialBoard";
import HomeLayout2 from "@/components/homeLayout2";
import PopularPosts from "@/components/thirdColumn";

export default function EditorialBoard() {
    return(
        <div className="bg-gray-100">
              <HomeLayout2
                left={<EditorialBoardPage />}
                right={<PopularPosts />}
              />
            </div>
    )
}