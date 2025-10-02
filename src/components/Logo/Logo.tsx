import css from "./Logo.module.css";
import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <>
      <NavLink className={css.logo} to="/">
        Nanny.Services
      </NavLink>
    </>
  );
}
