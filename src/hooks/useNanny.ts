import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../api/client";
import type { Nanny } from "../types/nanny";

export function useNanny(id: string | undefined) {
  return useQuery<Nanny>({
    queryKey: ["nanny", id],
    enabled: !!id,
    queryFn: () => apiFetch<Nanny>(`/nannies/${id}`),
  });
}
