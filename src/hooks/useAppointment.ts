import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface AppointmentData {
  address: string;
  phoneNamber: string;
  childAge: string;
  meetingTime: string;
  email: string;
  parentsName: string;
  comment: string;
  nannyName: string;
  nannyAvatar: string;
}

interface CreateAppointmentArgs {
  uid: string;
  data: AppointmentData;
}

export default function useAppointment() {
  const createAppointment = useMutation({
    mutationFn: async (_args: CreateAppointmentArgs) => {
      toast.info("Appointments are not available yet.");
    },
  });

  return { createAppointment };
}
