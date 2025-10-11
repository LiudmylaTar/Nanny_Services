import { useEffect, type ReactNode, type MouseEvent } from "react";
import clsx from "clsx";
import Icon from "../../../shared/Icon";
import css from "./Modal.module.css";

interface ModalProps {
  title?: string;
  description?: string;
  hideHeader?: boolean;
  onClose: () => void;
  variant?: "default" | "mobileMenu" | "appointment";
  children: ReactNode;
}

export default function Modal({
  title,
  description,
  variant = "default",
  hideHeader = false,
  children,
  onClose,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div
        className={clsx(css.modal, {
          [css.mobileModal]: variant === "mobileMenu",
          [css.appointmentModal]: variant === "appointment",
        })}
      >
        <button
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <Icon
            name="close"
            className={clsx(css.closeIcon, {
              [css.mobileCloseIcon]: variant === "mobileMenu",
            })}
          />{" "}
        </button>
        {!hideHeader && title && <h2 className={css.title}>{title}</h2>}
        {!hideHeader && description && (
          <p className={css.description}>{description}</p>
        )}
        <div className={css.actions}>{children}</div>
      </div>
    </div>
  );
}
