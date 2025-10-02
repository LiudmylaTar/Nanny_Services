import Button from "../common/Button/Button";
import css from "./AuthNav.module.css";

export default function AuthNav() {
  return (
    <div className={css.btnWrapper}>
      <Button variant="transparent">Log In</Button>
      <Button>Registration</Button>
    </div>
  );
}
