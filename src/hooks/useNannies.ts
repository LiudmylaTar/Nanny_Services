import { useQuery } from "@tanstack/react-query";
import type { Nanny } from "../types/nanny";

const BASE_URL =
  "https://nanny-api-default-rtdb.europe-west1.firebasedatabase.app/nannies.json";

export type FilterOption =
  | "all"
  | "name-asc"
  | "name-desc"
  | "price-low"
  | "price-high"
  | "popular"
  | "not-popular";

interface UseNanniesProps {
  limit: number;
  filter: FilterOption;
}

export function useNannies({ filter }: UseNanniesProps) {
  return useQuery<Nanny[], Error>({
    queryKey: ["nannies", filter],
    queryFn: async () => {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error("Failed to load nannies");

      const data = (await res.json()) as Record<
        string,
        Omit<Nanny, "id"> | null
      > | null;
      if (!data) return [];

      const items = Object.entries(data)
        .filter(([, value]) => value !== null)
        .map(([id, value]) => ({ id, ...(value as Omit<Nanny, "id">) }));

      // сортування на клієнті
      switch (filter) {
        case "name-asc":
          items.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name-desc":
          items.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "price-low":
          items.sort((a, b) => a.price_per_hour - b.price_per_hour);
          break;
        case "price-high":
          items.sort((a, b) => b.price_per_hour - a.price_per_hour);
          break;
        case "popular":
          items.sort((a, b) => b.rating - a.rating);
          break;
        case "not-popular":
          items.sort((a, b) => a.rating - b.rating);
          break;
      }

      return items;
    },
    staleTime: 1000 * 60,
  });
}
