import axios from "axios";
import style from "./signup.module.css";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    nickname: "",
    password: "",
  });

  const [error, setError] = useState("");

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const onHandleSignUp = async () => {
    if (!formData.nickname || !formData.password) {
      console.log(formData);
      setError("닉네임과 비밀번호를 입력해주세요.");
      return;
    }
    try {
      // 나중에 요청 방법 명확해지면 shared 폴더에 로직 옮길 것
      const response = await axios.post("/user", {
        nickname: formData.nickname,
        password: formData.password,
      });
      alert("회원가입 성공!");
      console.log(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "회원가입에 실패했습니다.");
      } else {
        setError("서버와 연결할 수 없습니다.");
      }
    }
  };
  return (
    <div className={style.container}>
      <section>
        <h1 className={style.welcome}>Hey, Welcome Back!</h1>
      </section>
      <section>
        <div>
          <h3 className={style.input_text}>Nickname</h3>
          <input
            type="text"
            name="nickname"
            placeholder="사용하실 닉네임을 입력해주세요..."
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
            placeholder="비밀번호를 정해주세요..."
            className={style.input_data}
            value={formData.password}
            onChange={onHandleChange}
          />
          <button className={style.signup_button} onClick={onHandleSignUp}>
            Sign Up
          </button>
          {error && <p className={style.error}>{error}</p>}
        </div>
      </section>
    </div>
  );
}
