import { useEffect } from "react";
import { useAuthStore } from "@/authStore";
import { useRouter } from "next/router";
import NavigationBar from "@/widgets/header";

export default function Home() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn); // 로그인 상태
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/"); // 로그인 페이지로 리다이렉트
    }
  }, [isLoggedIn, router]);

  return (
    <div>
      <NavigationBar />
      <div style={{ paddingTop: "60px" }}>
        <h1>hello, Next!</h1>
      </div>
    </div>
  );
}
