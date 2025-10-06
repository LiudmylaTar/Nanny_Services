import { get, ref } from "firebase/database";
import type { Nanny } from "../types/nanny";
import { db } from "../api/firebase";
import type { UserProfile } from "../types/user";

interface FetchFavoritesOptions {
  limit?: number;
  startAt?: string;
}

export default async function fetchFavorites(
  uid: string,
  options: FetchFavoritesOptions = {}
): Promise<Nanny[]> {
  const snapshot = await get(ref(db, `users/${uid}`));
  const profile: UserProfile | null = snapshot.exists() ? snapshot.val() : null;

  if (!profile || !profile.favorites.length) return [];
  // Сортуємо id, щоб підтримати "пагінацію"
  const sorted = [...profile.favorites].sort();

  let startIndex = 0;
  if (options.startAt) {
    const idx = sorted.findIndex((id) => id === options.startAt);
    startIndex = idx >= 0 ? idx + 1 : 0;
  }

  const slice = sorted.slice(
    startIndex,
    startIndex + (options.limit ?? sorted.length)
  );

  const requests = slice.map(async (id) => {
    const res = await fetch(
      `https://nanny-api-default-rtdb.europe-west1.firebasedatabase.app/nannies/${id}.json`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data ? { id, ...data } : null;
  });

  const result = await Promise.all(requests);
  return result.filter(Boolean) as Nanny[];
}
