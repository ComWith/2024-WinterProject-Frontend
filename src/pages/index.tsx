import { useRouter } from "next/router";
import style from "@/styles/index.module.css";
import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "./stores/authStore";
import NavigationBar from "@/widgets/header";

export default function Login() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const [error, setError] = useState("");

  const setUser = useAuthStore((state) => state.setUser); // Zustand의 setUser 함수
  const router = useRouter();

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onHandleLogin = async () => {
    const { id, password } = formData;

    if (!id || !password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("/api/login", { id, password });

      // 로그인 성공 시 상태 저장 및 리다이렉트
      const { user } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      setUser({
        nickname: user.nickname,
        id: user.id,
      });
      alert("로그인 성공!");
      router.push("/home");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "로그인에 실패했습니다.");
      } else {
        setError("서버와 연결할 수 없습니다.");
      }
    }
  };

  const onHandleRedirectToSignUp = () => {
    router.push("/signup");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onHandleLogin();
    }
  };

  return (
    <>
      <NavigationBar />
      <hr />
      <div className={style.container}>
        <div>
          <h1 className={style.login_text}>Login</h1>
        </div>
        <div className={style.form_container}>
          <div>
            <h3 className={style.input_text}>ID</h3>
            <input
              type="text"
              name="id"
              placeholder="Enter your ID"
              className={style.input_data}
              value={formData.id}
              onChange={onHandleChange}
            />
          </div>
          <div>
            <h3 className={style.input_text}>Password</h3>
            <input
              type="password"
              name="password"
              onKeyDown={onKeyDown}
              placeholder="Enter your Password"
              className={style.input_data}
              value={formData.password}
              onChange={onHandleChange}
            />
            <div className={style.button_container}>
              <button
                className={style.button}
                onClick={onHandleRedirectToSignUp}
              >
                No Account?
              </button>
              <button onClick={onHandleLogin} className={style.button}>
                Log in
              </button>
            </div>
            {error && <p className={style.error}>{error}</p>}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
