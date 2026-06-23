import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../api/client";
import type { Nanny } from "../types/nanny";
import type { UserProfile } from "../types/user";

interface ToggleFavoriteArgs {
  nannyId: string;
  userId: string;
  nanny?: Nanny;
}

export default function useFavorites() {
  const queryClient = useQueryClient();

  const toggleFavorite = useMutation({
    mutationFn: ({ nannyId }: ToggleFavoriteArgs) =>
      apiFetch<{ isFavorite: boolean }>(`/nannies/${nannyId}/favorite`, {
        method: "PATCH",
      }),

    onMutate: async ({ nannyId, userId, nanny }) => {
      const profileKey = ["userProfile", userId] as const;
      const favoritesKey = ["favorites"] as const;

      await queryClient.cancelQueries({ queryKey: profileKey });
      await queryClient.cancelQueries({ queryKey: favoritesKey });

      const prevProfile = queryClient.getQueryData<UserProfile | null>(profileKey);
      const prevFavorites = queryClient.getQueryData<Nanny[]>(favoritesKey);

      if (prevProfile) {
        const isFav = prevProfile.favorites.includes(nannyId);
        queryClient.setQueryData<UserProfile>(profileKey, {
          ...prevProfile,
          favorites: isFav
            ? prevProfile.favorites.filter((id) => id !== nannyId)
            : [...prevProfile.favorites, nannyId],
        });
      }

      if (prevFavorites) {
        const isFav = prevFavorites.some((n) => n.id === nannyId);
        queryClient.setQueryData<Nanny[]>(
          favoritesKey,
          isFav
            ? prevFavorites.filter((n) => n.id !== nannyId)
            : nanny
              ? [...prevFavorites, nanny]
              : prevFavorites
        );
      }

      return { prevProfile, prevFavorites, profileKey, favoritesKey };
    },

    onError: (_err, _vars, ctx) => {
      if (!ctx) return;
      if (ctx.prevProfile !== undefined) {
        queryClient.setQueryData(ctx.profileKey, ctx.prevProfile);
      }
      if (ctx.prevFavorites !== undefined) {
        queryClient.setQueryData(ctx.favoritesKey, ctx.prevFavorites);
      }
    },

    onSettled: (_data, _err, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile", userId] });
    },
  });

  return { toggleFavorite };
}
