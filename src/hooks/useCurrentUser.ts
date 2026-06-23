import { useQuery } from "@tanstack/react-query";
import { apiFetch, refreshAccessToken } from "../api/client";
import type { User } from "../types/user";

export default function useCurrentUser() {
  return useQuery<User | null>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      if (!localStorage.getItem("accessToken")) {
        const token = await refreshAccessToken();
        if (!token) return null;
      }

      try {
        const { user } = await apiFetch<{ user: User }>("/auth/me");
        return user;
      } catch {
        return null;
      }
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
