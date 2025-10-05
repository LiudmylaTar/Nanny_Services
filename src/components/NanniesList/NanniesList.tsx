import type { Nanny } from "../../types/nanny";
import NannyItem from "../NannyItem/NannyItem";
import css from "./NanniesList.module.css";

interface NanniesListProps {
  nannies: Nanny[];
}

export default function NanniesList({ nannies }: NanniesListProps) {
  return (
    <ul className={css.list}>
      {nannies.map((nanny) => (
        <li className={css.item} key={`${nanny.id}`}>
          <NannyItem nanny={nanny} />
        </li>
      ))}
    </ul>
  );
}
