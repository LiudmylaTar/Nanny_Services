import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./AppointmentForm.module.css";
import FormInput from "../FormInput/FormInput";
import Button from "../common/Button/Button";
import { toast } from "react-toastify";

const AppointmentSchema = yup.object({
  address: yup.string().required("Address is required"),
  phoneNamber: yup.string().min(6).required("PhoneNamber is required"),
  childAge: yup.string().required("Age is required"),
  meetingTime: yup.string().required("Appointment time is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  parentsName: yup
    .string()
    .min(6)
    .required("Father's or mother's name is required"),
  comment: yup.string().required("Сomment is required"),
});

type AppointmentFormValues = {
  address: string;
  phoneNamber: string;
  childAge: string;
  meetingTime: string;
  email: string;
  parentsName: string;
  comment: string;
};

interface AppointmentFormProps {
  onClose: () => void;
  nanny: {
    name: string;
    avatar: string;
  };
}

export default function AppointmentForm({
  onClose,
  nanny,
}: AppointmentFormProps) {
  const methods = useForm<AppointmentFormValues>({
    resolver: yupResolver(AppointmentSchema),
    mode: "onTouched",
  });
  const { handleSubmit } = methods;
  const onSubmit = async (data: AppointmentFormValues) => {
    try {
      // тут можеш робити запит на бекенд
      console.log("Form data:", data);

      toast.success("Your appointment request has been sent!");
      onClose(); // закриваємо модалку після успіху
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <div className={css.nannyInfo}>
        <img
          className={css.photoNanny}
          src={nanny.avatar}
          alt={nanny.name}
          width={44}
          height={44}
        />
        <div>
          <p className={css.text}>Your nanny</p>
          <p className={css.name}>{nanny.name}</p>
        </div>
      </div>
      <FormProvider {...methods}>
        <form className={css.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <div className={css.inpunWrapper}>
            <FormInput name="address" placeholder="Address" />
            <FormInput name="phoneNamber" placeholder="+380" />
          </div>
          <div className={css.inpunWrapper}>
            <FormInput name="childAge" placeholder="Child's age" />
            <FormInput name="meetingTime" placeholder="00:00" />
          </div>
          <FormInput name="email" placeholder="Email" />
          <FormInput
            name="parentsName"
            placeholder="Father's or mother's name"
          />
          <textarea
            {...methods.register("comment")}
            placeholder="Comment"
            className={css.textareaField}
          />
          <Button type="submit" fullWidth={true}>
            Send
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
