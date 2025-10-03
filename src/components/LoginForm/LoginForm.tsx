import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import css from "./LoginForm.module.css";
import FormInput from "../FormInput/FormInput";
import PasswordInput from "../FormInput/PasswordInput";
import Button from "../common/Button/Button";

const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

type LoginFormValues = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onClose: () => void;
}
export default function LoginForm({ onClose }: LoginFormProps) {
  const methods = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
  });
  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
    onClose();
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={css.field}>
          <FormInput name="email" placeholder="Email" />
          <PasswordInput name="password" placeholder="Password" />
        </div>
        <Button type="submit" fullWidth={true}>
          {" "}
          Log In
        </Button>
      </form>
    </FormProvider>
  );
}
