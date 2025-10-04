import Icon from "../../shared/Icon";
import type { CurrentUser, UserProfile } from "../../types/user";
import Button from "../common/Button/Button";
import css from "./AuthNav.module.css";

interface AuthNavProps {
  onOpenModal: (type: "login" | "register") => void;
  onLogout: () => void;
  isUser: CurrentUser;
  profile?: UserProfile | null | undefined;
}

export default function AuthNav({
  onOpenModal,
  onLogout,
  isUser,
  profile,
}: AuthNavProps) {
  return (
    <div className={css.btnWrapper}>
      {isUser ? (
        <>
          <div className={css.userWrapper}>
            <div className={css.userInfo}>
              <Icon name="mdi_user" className={css.icon} />
            </div>
            <p className={css.userName}>{profile?.name}</p>
          </div>
          <Button variant="transparent" onClick={() => onLogout()}>
            Log out
          </Button>
        </>
      ) : (
        <>
          <Button variant="transparent" onClick={() => onOpenModal("login")}>
            Log In
          </Button>
          <Button onClick={() => onOpenModal("register")}>Registration</Button>
        </>
      )}
    </div>
  );
}
