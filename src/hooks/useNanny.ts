import { useQuery } from "@tanstack/react-query";
import type { Nanny } from "../types/nanny";

export function useNanny(id: string | undefined) {
  return useQuery<Nanny>({
    queryKey: ["nanny", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await fetch(
        `https://nanny-api-default-rtdb.europe-west1.firebasedatabase.app/nannies/${id}.json`
      );
      if (!res.ok) throw new Error("Failed to load nanny");
      const data = await res.json();
      const reviews = data.reviews ? Object.values(data.reviews) : [];

      return { id, ...data, reviews } as Nanny;
    },
  });
}
