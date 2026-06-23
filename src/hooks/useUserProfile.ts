import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../api/client";
import type { UserProfile } from "../types/user";

export function useUserProfile(userId: string | undefined) {
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      const res = await apiFetch<{ data: { id: string }[] }>(
        "/nannies/favorites"
      );
      return {
        email: "",
        name: "",
        favorites: res.data.map((nanny) => nanny.id),
      };
    },
    enabled: !!userId,
  });
}
