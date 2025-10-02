import NavLinks from "../NavLinks/NavLinks";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import css from "./Header.module.css";
import AuthNav from "../AuthNav/AuthNav";
import Logo from "../Logo/Logo";

export default function Header() {
  const location = useLocation();
  const isMain = location.pathname === "/";

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
          <NavLinks />
          <AuthNav />
        </div>
      </div>
    </header>
  );
}
