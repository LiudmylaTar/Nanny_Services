import { useQuery } from "@tanstack/react-query";
import { ref, get } from "firebase/database";
import { db } from "../api/firebase";
import type { UserProfile } from "../types/user";

export function useUserProfile(uid: string | undefined) {
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile", uid],
    queryFn: async () => {
      if (!uid) return null;
      const snapshot = await get(ref(db, `users/${uid}`));
      if (!snapshot.exists()) return null;
      return snapshot.val();
    },
    enabled: !!uid, // запускається тільки якщо є користувач
  });
}
