import { useRouter } from "next/router";
import { useAuthStore } from "@/authStore";
import style from "./header.module.css";

export default function NavigationBar() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
    router.push("/login");
  };

  return (
    <nav className={style.navigation}>
      <h1 className={style.logo} onClick={() => router.push("/")}>
        웹서비스 이름
      </h1>

      <div className={style.menu}>
        <button
          className={style.menu_item}
          onClick={() => router.push("/allsheets")}
        >
          변환된 악보
        </button>
        <button className={style.menu_item} onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </nav>
  );
}
