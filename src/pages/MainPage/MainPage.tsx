import Button from "../../components/common/Button/Button";
import Icon from "../../shared/Icon";
import css from "./MainPage.module.css";

export default function MainPage() {
  return (
    <section className={css.hero}>
      <div className={css.leftSide}>
        <div className={css.titelWrapper}>
          <h1 className={css.titel}>Make Life Easier for the Family:</h1>
          <p className={css.slogan}>
            Find Babysitters Online for All Occasions
          </p>
        </div>
        <Button variant="transparent" size="large" className={css.startBtn}>
          Get started{" "}
          <span>
            <Icon name="Arrow-up" className={css.arrowUpIcon} />
          </span>
        </Button>
      </div>
      <div className={css.rightSide}>
        <div className={css.wrapper}>
          <div className={css.iconWrapper}>
            <Icon name="fe_check" className={css.checkIcon} />
          </div>
          <div>
            <p className={css.text}>Experienced nannies</p>
            <p className={css.number}>15,000</p>
          </div>
        </div>
      </div>
    </section>
  );
}
