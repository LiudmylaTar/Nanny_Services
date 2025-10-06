import { Link } from "react-router-dom";
import css from "./EmptyState.module.css";
import Icon from "../../shared/Icon";
interface EmptyStateProps {
  title: string;
  hint?: string;
  iconName?: string;
  linkTo?: string;
  linkLabel?: string;
}
export default function EmptyState({
  title,
  hint,
  iconName,
  linkTo,
  linkLabel,
}: EmptyStateProps) {
  return (
    <div className={css.wrapper}>
      <p className={css.title}>{title}</p>
      {hint && (
        <p className={css.hint}>
          {hint} {iconName && <Icon name={iconName} className={css.icon} />}
        </p>
      )}
      {linkTo && linkLabel && (
        <Link to={linkTo} className={css.link}>
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
