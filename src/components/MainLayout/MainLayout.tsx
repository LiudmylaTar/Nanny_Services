import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import clsx from "clsx";
import css from "./MainLayout.module.css";

interface MainLayoutProps {
  fullWidth?: boolean;
}

export default function MainLayout({ fullWidth }: MainLayoutProps) {
  return (
    <div className="theme-green">
      <Header />
      <main className={clsx(css.conttainer, { [css.fullWidth]: fullWidth })}>
        <Outlet />
      </main>
    </div>
  );
}
