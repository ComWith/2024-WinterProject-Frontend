import axios from "axios";
import style from "@/styles/signup.module.css";
import { useState } from "react";
import { useAuthStore } from "./stores/authStore";
import { useRouter } from "next/router";
import NavigationBar from "@/widgets/header";

export default function SignUp() {
  const [formData, setFormData] = useState({
    nickname: "",
    id: "",
    password: "",
  });

  const [error, setError] = useState("");

  const router = useRouter();

  // Zustand 상태 업데이트 함수 가져오기
  const setUser = useAuthStore((state) => state.setUser);

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onHandleSignUp = async () => {
    if (!formData.nickname || !formData.password) {
      setError("닉네임과 비밀번호를 입력해주세요.");
      return;
    }
    try {
      const response = await axios.post("/api/users", {
        nickname: formData.nickname,
        id: formData.id,
        password: formData.password,
      });

      // 회원가입 성공 시 Zustand에 사용자 정보 저장
      setUser({
        id: formData.id, // 사용자 ID 추가
        nickname: formData.nickname,
      });
      alert("회원가입 성공!");
      router.push("/home");
      console.log(response);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "회원가입에 실패했습니다.");
      } else {
        setError("서버와 연결할 수 없습니다.");
      }
    }
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onHandleSignUp();
    }
  };

  return (
    <>
      <NavigationBar />
      <hr />
      <div className={style.container}>
        <div>
          <h1 className={style.signup_container}>Registration Information</h1>
          <p>Please fill in the required fields.</p>
        </div>
        <div className={style.form_container}>
          <div>
            <h3 className={style.input_text}>Nickname</h3>
            <input
              type="text"
              name="nickname"
              placeholder="Enter your nickname"
              className={style.input_data}
              value={formData.nickname}
              onChange={onHandleChange}
            />
          </div>
          <div>
            <h3 className={style.input_text}>ID</h3>
            <input
              type="text"
              name="id"
              placeholder="Enter your user ID"
              className={style.input_data}
              value={formData.id}
              onChange={onHandleChange}
            />
          </div>
          <div>
            <h3 className={style.input_text}>Password</h3>
            <input
              onKeyDown={onKeyDown}
              type="password"
              name="password"
              placeholder="Enter your password"
              className={style.input_data}
              value={formData.password}
              onChange={onHandleChange}
            />
            <button className={style.signup_button} onClick={onHandleSignUp}>
              Sign Up
            </button>
            {error && <p className={style.error}>{error}</p>}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
