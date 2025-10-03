import Button from "../common/Button/Button";
import css from "./AuthNav.module.css";

interface AuthNavProps {
  onOpenModal: (type: "login" | "register") => void;
}

export default function AuthNav({ onOpenModal }: AuthNavProps) {
  return (
    <div className={css.btnWrapper}>
      <Button variant="transparent" onClick={() => onOpenModal("login")}>
        Log In
      </Button>
      <Button onClick={() => onOpenModal("register")}>Registration</Button>
    </div>
  );
}
