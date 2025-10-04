import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../../api/firebase";

export default function useAuthMutations() {
  const queryClient = useQueryClient();

  const register = useMutation({
    mutationFn: async ({
      email,
      password,
      name,
    }: {
      email: string;
      password: string;
      name: string;
    }) => {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await set(ref(db, `users/${cred.user.uid}`), {
        email,
        name,
        favorites: [],
      });
      return cred.user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
  const login = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signInWithEmailAndPassword(auth, email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  const logout = useMutation({
    mutationFn: () => signOut(auth),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  return { register, login, logout };
}
