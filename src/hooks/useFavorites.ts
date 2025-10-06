import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { ref, update } from "firebase/database";
import { db } from "../api/firebase";
import type { UserProfile } from "../types/user";
import type { Nanny } from "../types/nanny";

interface ToggleFavoriteArgs {
  uid: string;
  nannyId: string;
  isFavorite: boolean;
}
export default function useFavorites() {
  const queryClient = useQueryClient();
  const toggleFavorite = useMutation({
    mutationFn: async ({ uid, nannyId, isFavorite }: ToggleFavoriteArgs) => {
      const current: string[] =
        (
          queryClient.getQueryData(["userProfile", uid]) as
            | UserProfile
            | undefined
        )?.favorites || [];
      const newFavorites = isFavorite
        ? current.filter((id) => id !== nannyId) // видалити
        : [...current, nannyId]; // додати

      await update(ref(db, `users/${uid}`), { favorites: newFavorites });
      return newFavorites;
    },
    onMutate: async ({ uid, nannyId, isFavorite }) => {
      await queryClient.cancelQueries({ queryKey: ["favorites", uid] });

      const prev = queryClient.getQueryData<InfiniteData<Nanny[]>>([
        "favorites",
        uid,
      ]);

      queryClient.setQueryData<InfiniteData<Nanny[]>>(
        ["favorites", uid],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) =>
              isFavorite ? page.filter((n) => n.id !== nannyId) : page
            ),
          };
        }
      );

      return { prev };
    },

    onError: (_err, { uid }, ctx) => {
      if (ctx?.prev) {
        queryClient.setQueryData(["favorites", uid], ctx.prev);
      }
    },

    onSuccess: (_, { uid }) => {
      queryClient.invalidateQueries({ queryKey: ["userProfile", uid] });
      queryClient.invalidateQueries({
        queryKey: ["favorites", uid],
        exact: false,
      });
    },
  });
  return { toggleFavorite };
}
