import { useFormContext } from "react-hook-form";
import css from "./Input.module.css";

type FormInputProps = {
  name: string;
  placeholder?: string;
  type?: string;
};
const FormInput = ({ name, placeholder, type = "text" }: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={css.inputField}
      />
      {errors[name] && (
        <span style={{ color: "red" }}>{String(errors[name]?.message)}</span>
      )}
    </div>
  );
};

export default FormInput;
