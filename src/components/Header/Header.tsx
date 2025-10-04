import NavLinks from "../NavLinks/NavLinks";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import css from "./Header.module.css";
import AuthNav from "../AuthNav/AuthNav";
import Logo from "../Logo/Logo";
import { useState } from "react";
import Modal from "../common/Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useUserProfile } from "../../hooks/useUserProfile";
import useAuthMutations from "../servise/auth";

export default function Header() {
  const location = useLocation();
  const isMain = location.pathname === "/";
  const [modalType, setModalType] = useState<null | "login" | "register">(null);
  const handleClose = () => setModalType(null);

  const { data: user = null } = useCurrentUser();
  const { data: profile } = useUserProfile(user?.uid);
  const { logout } = useAuthMutations();

  const modalContent = {
    login: {
      title: "Log In",
      description:
        "Welcome back! Please enter your credentials to access your account and continue your babysitter search.",
    },
    register: {
      title: "Registration",
      description:
        "Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.",
    },
  } as const;

  return (
    <header
      className={clsx(css.header, {
        [css.transparent]: isMain,
        [css.solid]: !isMain,
      })}
    >
      <div className={css.container}>
        <Logo />
        <div className={css.menu}>
          <NavLinks isUser={user} />
          <AuthNav
            onOpenModal={setModalType}
            onLogout={() => logout.mutate()}
            isUser={user}
            profile={profile}
          />
        </div>
      </div>
      {modalType && (
        <Modal
          onClose={handleClose}
          title={modalContent[modalType].title}
          description={modalContent[modalType].description}
        >
          {modalType === "login" && <LoginForm onClose={handleClose} />}
          {modalType === "register" && <RegisterForm onClose={handleClose} />}
        </Modal>
      )}
    </header>
  );
}
