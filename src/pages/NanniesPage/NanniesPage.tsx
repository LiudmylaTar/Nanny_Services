import { useEffect, useState } from "react";
import Button from "../../components/common/Button/Button";
import NanniesList from "../../components/NanniesList/NanniesList";
import { useNannies } from "../../hooks/useNannies";
import type { Nanny } from "../../types/nanny";

export default function NanniesPage() {
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [lastValue, setLastValue] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);

  const {
    data = [],
    isLoading,
    isError,
  } = useNannies({
    limit: 3,
    startAt: lastValue,
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setNannies((prev) => {
        const merged = [...prev];
        data.forEach((item) => {
          if (!merged.some((p) => p.id === item.id)) {
            merged.push(item);
          }
        });
        return merged;
      });

      if (data.length < 3) setHasMore(false);
    }
  }, [data]);

  if (isLoading && !nannies.length) return <p>Loading, please wait...</p>;
  if (isError) return <p>Oops, something went wrong. Try again later…</p>;

  return (
    <>
      <NanniesList nannies={nannies} />
      {hasMore && (
        <Button onClick={() => setLastValue(nannies[nannies.length - 1].id)}>
          Load more
        </Button>
      )}
    </>
  );
}
