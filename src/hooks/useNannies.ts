import { useQuery } from "@tanstack/react-query";
import type { Nanny } from "../types/nanny";

interface UseNanniesProps {
  limit: number;
  startAt?: string; // ключ останньої няні
}

export function useNannies({ limit, startAt }: UseNanniesProps) {
  return useQuery<Nanny[]>({
    queryKey: ["nannies", limit, startAt],
    queryFn: async () => {
      const url = new URL(
        "https://nanny-api-default-rtdb.europe-west1.firebasedatabase.app/nannies.json"
      );
      url.searchParams.set("orderBy", JSON.stringify("$key"));
      url.searchParams.set("limitToFirst", String(limit));
      if (startAt) {
        url.searchParams.set("startAt", JSON.stringify(startAt));
      }
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to load nannies");
      const data = (await res.json()) as Record<string, Omit<Nanny, "id">>;
      return Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value,
      }));
    },
    placeholderData: (previousData) => previousData,
  });
}
