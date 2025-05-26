import HomeLayout2 from "@/components/homeLayout2";
import LoginRegister from "@/components/loginRegister";
import PopularPosts from "@/components/secondColumn";

export default function SignupPage() {
  return (
    <div className="bg-gray-100">
        <HomeLayout2
        left = {<LoginRegister />}
        right = {<PopularPosts />}
        />
    </div>
  );
}