import { useEffect } from "react";
import { useAuthStore } from "../entities/user/authStore";
import { useRouter } from "next/router";

export default function Home() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn); // 로그인 상태
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/"); // 로그인 페이지로 리다이렉트
    }
  }, [isLoggedIn, router]);

  const handleLogout = () => {
    logout(); // Zustand 상태 초기화
    localStorage.removeItem("user"); // 로컬 스토리지에서 사용자 정보 제거
    localStorage.removeItem("token"); // (JWT 사용 시) 토큰 제거
    router.push("/login"); // 로그인 페이지로 리다이렉트
  };
  return (
    <>
      <h1>hello, Next!</h1>
      <button
        onClick={handleLogout}
        style={{ marginTop: "20px", padding: "10px" }}
      >
        로그아웃
      </button>
    </>
  );
}
