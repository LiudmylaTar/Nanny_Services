import { useState } from "react";
import css from "./NanniesPage.module.css";
import Button from "../../components/common/Button/Button";
import NanniesList from "../../components/NanniesList/NanniesList";
import { useNannies } from "../../hooks/useNannies";
import FilterBar, {
  type FilterOption,
} from "../../components/FilterBar/FilterBar";

export default function NanniesPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("all");

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNannies({ filter: selectedFilter });

  const nannies = data?.pages.flatMap((page) => page.data) ?? [];
  const total = data?.pages[0]?.total ?? 0;

  if (isLoading && !nannies.length) return <p>Loading, please wait...</p>;
  if (isError) {
    console.error("NanniesPage useNannies error:", error);
    return <p>Oops, something went wrong: {String(error?.message)}</p>;
  }

  return (
    <>
      <FilterBar onChange={(f) => setSelectedFilter(f)} />
      {!isLoading && total === 0 && <p>No nannies match this filter.</p>}
      {!isLoading && nannies.length > 0 && (
        <>
          <NanniesList nannies={nannies} />
          {hasNextPage && (
            <div className={css.btnWrapper}>
              <Button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Loading..." : "Load more"}
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}
