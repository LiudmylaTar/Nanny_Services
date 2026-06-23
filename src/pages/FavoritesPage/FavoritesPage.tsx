import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../api/client";
import useCurrentUser from "../../hooks/useCurrentUser";
import type { Nanny } from "../../types/nanny";
import NanniesList from "../../components/NanniesList/NanniesList";
import EmptyState from "../../components/EmptyState/EmptyState";

export default function FavoritesPage() {
  const { data: user } = useCurrentUser();

  const { data: favorites = [], isLoading } = useQuery<Nanny[]>({
    queryKey: ["favorites"],
    queryFn: async () => {
      const res = await apiFetch<{ data: Omit<Nanny, "reviews">[] }>(
        "/nannies/favorites"
      );
      return res.data.map((nanny) => ({ ...nanny, reviews: [] }));
    },
    enabled: !!user,
  });

  if (!user) return <p>Please log in to view favorites.</p>;
  if (isLoading) return <p>Loading...</p>;

  if (!favorites.length) {
    return (
      <EmptyState
        title="No favorites yet."
        hint="To add a nanny to your favorites, on nanny cards click the"
        iconName="HeartNormal"
        linkTo="/nannies"
        linkLabel="Back to nannies list"
      />
    );
  }

  return <NanniesList nannies={favorites} />;
}
