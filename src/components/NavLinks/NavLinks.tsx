import { NavLink, type NavLinkProps } from "react-router-dom";
import css from "./NavLinks.module.css";
import type { CurrentUser } from "../../types/user";

interface NavLinksProps {
  isUser: CurrentUser;
}

export default function NavLinks({ isUser }: NavLinksProps) {
  const getNavLinksClass: NavLinkProps["className"] = ({ isActive }) =>
    isActive ? `${css.link} ${css.active}` : css.link;
  return (
    <div className={css.linkWrapper}>
      <NavLink className={getNavLinksClass} to="/">
        Home
      </NavLink>
      <NavLink className={getNavLinksClass} to="/nannies">
        Nannies
      </NavLink>
      {isUser && (
        <NavLink className={getNavLinksClass} to="/favorites">
          Favorites
        </NavLink>
      )}
    </div>
  );
}
