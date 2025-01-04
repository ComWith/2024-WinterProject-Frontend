import style from "./signup.module.css";

export default function SignUp() {
  const onHandleClick = () => {
    console.log("클릭됐습니다!");
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
            placeholder="사용하실 닉네임을 입력해주세요..."
            className={style.input_data}
          />
        </div>
      </section>
      <section>
        <div>
          <h3 className={style.input_text}>Password</h3>
          <input
            type="password"
            placeholder="비밀번호를 정해주세요..."
            className={style.input_data}
          />
          <button className={style.signup_button} onClick={onHandleClick}>
            Sign Up
          </button>
        </div>
      </section>
    </div>
  );
}
