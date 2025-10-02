import { NavLink } from "react-router-dom";
import css from "./NavLinks.module.css";

export default function NavLinks() {
  return (
    <div className={css.linkWrapper}>
      <NavLink className={css.link} to="/">
        Home
      </NavLink>
      <NavLink className={css.link} to="/nannies">
        Nannies
      </NavLink>
    </div>
  );
}
