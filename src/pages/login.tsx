import { useRouter } from "next/router";
import style from "./login.module.css";
import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "@/\bentities/user/authStore";

export default function Login() {
  const [formData, setFormData] = useState({
    nickname: "",
    password: "",
  });
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser); // Zustand의 setUser 함수
  const router = useRouter();
  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };
  const onHandleLogin = async () => {
    if (!formData.nickname || !formData.password) {
      setError("닉네임과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("/users/login", {
        nickname: formData.nickname,
        password: formData.password,
      });

      // 로그인 성공 시 상태 저장 및 리다이렉트
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser({ nickname: formData.nickname });
      alert("로그인 성공!");
      router.push("/"); // 홈페이지로 이동
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

  return (
    <div className={style.container}>
      <section>
        <h1 className={style.login}>웹 서비스 이름</h1>
      </section>
      <section>
        <div>
          <h3 className={style.input_text}>Nickname</h3>
          <input
            type="text"
            name="nickname"
            placeholder="닉네임을 입력해주세요..."
            className={style.input_data}
            value={formData.nickname}
            onChange={onHandleChange}
          />
        </div>
      </section>
      <section>
        <div>
          <h3 className={style.input_text}>Password</h3>
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요..."
            className={style.input_data}
            value={formData.password}
            onChange={onHandleChange}
          />
          <button onClick={onHandleLogin} className={style.login_button}>
            로그인
          </button>
          {error && <p className={style.error}>{error}</p>}
          <hr />
          <button
            onClick={onHandleRedirectToSignUp}
            className={style.login_button}
          >
            계정이 없으신가요?
          </button>
        </div>
      </section>
    </div>
  );
}
