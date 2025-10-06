import { useEffect, useState } from "react";
import css from "./NanniesPage.module.css";
import Button from "../../components/common/Button/Button";
import NanniesList from "../../components/NanniesList/NanniesList";
import { useNannies } from "../../hooks/useNannies";
import type { Nanny } from "../../types/nanny";
import FilterBar, {
  type FilterOption,
} from "../../components/FilterBar/FilterBar";

export default function NanniesPage() {
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [page, setPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("all");

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useNannies({
    limit: 1000, // завантажуємо всі елементи один раз
    filter: selectedFilter,
  });
  const PAGE_SIZE = 3;
  useEffect(() => {
    if (data && data.length > 0) {
      const paginated = data.slice(0, page * PAGE_SIZE);
      setNannies(paginated);
    }
  }, [data, page]);

  useEffect(() => {
    setPage(1);
  }, [selectedFilter]);

  const hasMore = data.length > nannies.length;

  if (isLoading && !nannies.length) return <p>Loading, please wait...</p>;
  if (isError) {
    console.error("NanniesPage useNannies error:", error);
    return <p>Oops, something went wrong: {String(error?.message)}</p>;
  }

  return (
    <>
      <FilterBar onChange={(f) => setSelectedFilter(f)} />
      <NanniesList nannies={nannies} />
      {!isLoading && hasMore && (
        <div className={css.btnWrapper}>
          <Button onClick={() => setPage((p) => p + 1)}>Load more</Button>
        </div>
      )}
    </>
  );
}
