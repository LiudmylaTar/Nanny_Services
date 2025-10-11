import type { CurrentUser, UserProfile } from "../../types/user";
import AuthNav from "../AuthNav/AuthNav";
import NavLinks from "../NavLinks/NavLinks";

import css from "./MobileMenu.module.css";

interface MobileMenuProps {
  isUser: CurrentUser;
  onOpenModal: (type: "login" | "register") => void;
  onLogout: () => void;
  profile?: UserProfile | null;
}

export default function MobileMenu({
  isUser,
  onOpenModal,
  onLogout,
  profile,
}: MobileMenuProps) {
  return (
    <div className={css.menuWrapper}>
      <NavLinks isUser={isUser} vertical={true} />
      <AuthNav
        isUser={isUser}
        vertical={true}
        onOpenModal={onOpenModal}
        onLogout={onLogout}
        profile={profile}
      />
    </div>
  );
}
