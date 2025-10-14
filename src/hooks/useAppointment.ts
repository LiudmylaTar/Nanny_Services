import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ref, push, set } from "firebase/database";
import { db } from "../api/firebase";
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
  const queryClient = useQueryClient();
  const createAppointment = useMutation({
    mutationFn: async ({ uid, data }: CreateAppointmentArgs) => {
      const appointmentRef = ref(db, `users/${uid}/appointments`);
      const newAppointmentRef = push(appointmentRef);
      await set(newAppointmentRef, {
        ...data,
        createdAt: new Date().toISOString(),
      });
    },
    onSuccess: (_, { uid }) => {
      queryClient.invalidateQueries({ queryKey: ["appointments", uid] });
      toast.success("Your appointment request has been sent!");
    },

    onError: (error) => {
      console.error(error);
      toast.error("Failed to send appointment. Please try again.");
    },
  });
  return { createAppointment };
}
