import style from "./login.module.css";

export default function Login() {
  const onHandleSignUp = () => {};
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
          />
          <button onClick={onHandleSignUp} className={style.login_button}>
            Login
          </button>
        </div>
      </section>
    </div>
  );
}
