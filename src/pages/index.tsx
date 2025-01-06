import { useAuthStore } from "../entities/user/authStore";
import { useRouter } from "next/router";

export default function Home() {
  const logout = useAuthStore((state) => state.logout); // Zustand에서 로그아웃 함수 가져오기
  const router = useRouter();

  const handleLogout = () => {
    logout(); // Zustand 상태 초기화
    localStorage.removeItem("user"); // 로컬 스토리지에서 사용자 정보 제거
    localStorage.removeItem("token"); // (JWT 사용 시) 토큰 제거
    alert("로그아웃 되었습니다.");
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
