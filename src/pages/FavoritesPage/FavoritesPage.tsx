import { useAuthState } from "react-firebase-hooks/auth";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { auth } from "../../api/firebase";

import css from "./FavoritesPage.module.css";
import type { Nanny } from "../../types/nanny";
import NanniesList from "../../components/NanniesList/NanniesList";
import Button from "../../components/common/Button/Button";
import fetchFavorites from "../../servise/favoritesList";
import EmptyState from "../../components/EmptyState/EmptyState";

const PAGE_SIZE = 3;

export default function FavoritesPage() {
  const [user] = useAuthState(auth);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      Nanny[],
      Error,
      InfiniteData<Nanny[]>,
      [string, string | undefined],
      string | undefined
    >({
      queryKey: ["favorites", user?.uid],
      queryFn: ({ pageParam }) =>
        fetchFavorites(user!.uid, {
          limit: PAGE_SIZE,
          startAt: pageParam, // попередній останній id
        }),
      enabled: !!user,
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => {
        if (!lastPage || lastPage.length < PAGE_SIZE) {
          return undefined; // більше немає сторінок
        }
        return lastPage[lastPage.length - 1].id;
      },
    });

  if (!user) return <p>Please log in to view favorites.</p>;
  if (isLoading) return <p>Loading...</p>;
  const favorites = data?.pages.flat() ?? [];

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

  return (
    <>
      <NanniesList nannies={favorites} />
      {hasNextPage && (
        <div className={css.btnWrapper}>
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </>
  );
}
