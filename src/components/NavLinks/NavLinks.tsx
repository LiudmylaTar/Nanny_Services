import { NavLink, type NavLinkProps } from "react-router-dom";
import clsx from "clsx";
import css from "./NavLinks.module.css";
import type { CurrentUser } from "../../types/user";

interface NavLinksProps {
  isUser: CurrentUser;
  vertical?: boolean;
}

export default function NavLinks({ isUser, vertical = false }: NavLinksProps) {
  const getNavLinksClass: NavLinkProps["className"] = ({ isActive }) =>
    isActive ? `${css.link} ${css.active}` : css.link;
  return (
    <div
      className={clsx(css.linkWrapper, {
        [css.vertical]: vertical,
      })}
    >
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
