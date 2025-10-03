import { useEffect, type ReactNode, type MouseEvent } from "react";
import Icon from "../../../shared/Icon";
import css from "./Modal.module.css";

interface ModalProps {
  title: string;
  description: string;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({
  title,
  description,
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
      <div className={css.modal}>
        <button
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <Icon name="close" className={css.closeIcon} />{" "}
        </button>
        <h2 className={css.title}>{title}</h2>
        <p className={css.description}>{description}</p>
        <div className={css.actions}>{children}</div>
      </div>
    </div>
  );
}
