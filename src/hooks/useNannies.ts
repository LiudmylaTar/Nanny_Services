import { useInfiniteQuery } from "@tanstack/react-query";
import { apiFetch } from "../api/client";
import type { Nanny } from "../types/nanny";

export type FilterOption =
  | "all"
  | "name-asc"
  | "name-desc"
  | "less-than-10"
  | "greater-than-10"
  | "popular"
  | "not-popular";

const PAGE_SIZE = 3;

interface PaginatedNanniesResponse {
  data: Omit<Nanny, "reviews">[];
  total: number;
  page: number;
  totalPages: number;
}

interface UseNanniesProps {
  filter: FilterOption;
}

export function useNannies({ filter }: UseNanniesProps) {
  return useInfiniteQuery({
    queryKey: ["nannies", filter],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        filter,
        page: String(pageParam),
        limit: String(PAGE_SIZE),
      });
      const res = await apiFetch<PaginatedNanniesResponse>(
        `/nannies?${params.toString()}`
      );
      return {
        ...res,
        data: res.data.map((nanny) => ({ ...nanny, reviews: [] })),
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60,
  });
}
