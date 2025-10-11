import { Outlet } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
import Header from "../Header/Header";
import css from "./MainLayout.module.css";

interface MainLayoutProps {
  fullWidth?: boolean;
}

export default function MainLayout({ fullWidth }: MainLayoutProps) {
  const [modalType, setModalType] = useState<null | "login" | "register">(null);
  return (
    <div>
      <Header modalType={modalType} setModalType={setModalType} />
      <main className={clsx(css.conttainer, { [css.fullWidth]: fullWidth })}>
        <Outlet context={{ onOpenModal: setModalType }} />
      </main>
    </div>
  );
}
