import { useQuery } from "@tanstack/react-query";
import { auth } from "../api/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

export default function useCurrentUser() {
  return useQuery<User | null>({
    queryKey: ["currentUser"],
    queryFn: () =>
      new Promise<User | null>((resolve) => {
        const unsub = onAuthStateChanged(auth, (user) => {
          unsub(); // відписуємось після першого виклику
          resolve(user);
        });
      }),
    staleTime: Infinity, // не протухає
    gcTime: Infinity, // тримаємо в кеші
  });
}
