import style from "./header_login.module.css";

export default function NavigationLoginBar() {
  return (
    <nav className={style.Top_Bar}>
      <div className={style.Rectangle} />
      <h1 className={style.Title}>NotaNova</h1>
    </nav>
  );
}
