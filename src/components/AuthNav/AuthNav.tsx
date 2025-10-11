import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Icon from "../../shared/Icon";
import type { CurrentUser, UserProfile } from "../../types/user";
import Button from "../common/Button/Button";
import css from "./AuthNav.module.css";
import { useTheme } from "../../hooks/useTheme";

interface AuthNavProps {
  onOpenModal: (type: "login" | "register") => void;
  onLogout: () => void;
  isUser: CurrentUser;
  profile?: UserProfile | null | undefined;
  vertical?: boolean;
}

export default function AuthNav({
  onOpenModal,
  onLogout,
  isUser,
  profile,
  vertical = false,
}: AuthNavProps) {
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleChangeTheme = (newTheme: "red" | "blue" | "green") => {
    setTheme(newTheme);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={clsx(css.btnWrapper, {
        [css.vertical]: vertical,
      })}
    >
      {isUser ? (
        <>
          <div className={css.userWrapper} ref={wrapperRef}>
            <div
              className={css.userInfo}
              onClick={() => setOpen((prev) => !prev)}
            >
              <Icon name="mdi_user" className={css.icon} />
            </div>
            <p className={css.userName}>{profile?.name}</p>
            {open && (
              <div className={css.dropdown}>
                <button onClick={() => handleChangeTheme("red")}>Red</button>
                <button onClick={() => handleChangeTheme("blue")}>Blue</button>
                <button onClick={() => handleChangeTheme("green")}>
                  Green
                </button>
              </div>
            )}
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
