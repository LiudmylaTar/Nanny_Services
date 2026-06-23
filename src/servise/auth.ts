import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiFetch,
  clearAccessToken,
  clearAuthSession,
  markAuthSession,
  setAccessToken,
} from "../api/client";
import type { User } from "../types/user";

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
      const data = await apiFetch<{ accessToken: string; user: User }>(
        "/auth/register",
        { method: "POST", body: JSON.stringify({ name, email, password }) },
      );
      setAccessToken(data.accessToken);
      markAuthSession();
      return data.user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
  const login = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const data = await apiFetch<{ accessToken: string; user: User }>(
        "/auth/login",
        { method: "POST", body: JSON.stringify({ email, password }) },
      );
      setAccessToken(data.accessToken);
      markAuthSession();
      return data.user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      await apiFetch("/auth/logout", { method: "POST" });
      clearAccessToken();
      clearAuthSession();
    },
    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], null);
    },
  });

  return { register, login, logout };
}
