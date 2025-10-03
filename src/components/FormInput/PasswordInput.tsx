import { useFormContext } from "react-hook-form";
import css from "./Input.module.css";
import { useState } from "react";
import Icon from "../../shared/Icon";

type PasswordInputProps = {
  name: string;
  placeholder?: string;
};
const PasswordInput = ({ name, placeholder = "text" }: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div style={{ position: "relative" }}>
      <input
        {...register(name)}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className={css.inputField}
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className={css.eyeButton}
      >
        <Icon name={show ? "eye" : "eye-off"} className={css.eyeIcon} />
      </button>
      {errors[name] && (
        <span style={{ color: "red" }}>{String(errors[name]?.message)}</span>
      )}
    </div>
  );
};

export default PasswordInput;
