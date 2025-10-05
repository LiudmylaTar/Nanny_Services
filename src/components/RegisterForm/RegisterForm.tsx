import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";
import css from "./RegisterForm.module.css";
import FormInput from "../FormInput/FormInput";
import PasswordInput from "../FormInput/PasswordInput";
import Button from "../common/Button/Button";
import useAuthMutations from "../../servise/auth";

const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

interface RegisterFormProps {
  onClose: () => void;
}
export default function RegisterForm({ onClose }: RegisterFormProps) {
  const methods = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
  });

  const { register: registerMutation } = useAuthMutations();

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        toast.success("User successfully registered!");
        onClose();
      },
      onError: (error: unknown) => {
        const firebaseError = error as FirebaseError;
        toast.error(firebaseError.message || "Registration error");
        console.error("Mutation error:", error);
      },
    });
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={css.field}>
          <FormInput name="name" placeholder="Name" />
          <FormInput name="email" placeholder="Email" />
          <PasswordInput name="password" placeholder="Password" />
        </div>
        <Button type="submit" fullWidth={true}>
          {" "}
          Sign Up
        </Button>
      </form>
    </FormProvider>
  );
}
