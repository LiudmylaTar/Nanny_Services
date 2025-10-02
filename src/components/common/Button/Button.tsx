import React from "react";
import clsx from "clsx";

import css from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "transparent";
type ButtonSize = "normal" | "large";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "normal",
  fullWidth = false,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        css.button,
        css[variant],
        css[size],
        fullWidth && css.fullWidth,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
