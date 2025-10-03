import { Link } from "react-router-dom";
import css from "./NotFoumdPage.module.css";

export default function NotFoumdPage() {
  return (
    <>
      <h3 className={css.header}>Oops... page not found</h3>
      <p className={css.text}>
        You can retun on{" "}
        <Link to="/" className={css.link}>
          {" "}
          main page
        </Link>{" "}
        for start
      </p>
    </>
  );
}
