import { useEffect, useRef, useState } from "react";
import css from "./FilterBar.module.css";
import Icon from "../../shared/Icon";

export type FilterOption =
  | "name-asc"
  | "name-desc"
  | "less-than-10"
  | "greater-than-10"
  | "popular"
  | "not-popular"
  | "all";

interface FilterBarProps {
  onChange: (value: FilterOption) => void;
}

const options: { value: FilterOption; label: string }[] = [
  { value: "name-asc", label: "A to Z" },
  { value: "name-desc", label: "Z to A" },
  { value: "less-than-10", label: "Less than 10$" },
  { value: "greater-than-10", label: "Greater than 10$" },
  { value: "popular", label: "Popular" },
  { value: "not-popular", label: "Not popular" },
  { value: "all", label: "Show all" },
];

export default function FilterBar({ onChange }: FilterBarProps) {
  const [value, setValue] = useState<FilterOption>("all");
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (val: FilterOption) => {
    setValue(val);
    onChange(val);
    setOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={css.wrapper} ref={wrapperRef}>
      <label className={css.label} htmlFor="filter-dropdown">
        Filters
      </label>
      <div className={css.selectWrapper}>
        <button
          id="filter-dropdown"
          type="button"
          className={css.select}
          onClick={() => setOpen((prev) => !prev)}
        >
          {options.find((o) => o.value === value)?.label}
          <Icon className={css.downIcon} name="chevron-down" />
        </button>

        {open && (
          <ul className={css.dropdown}>
            {options.map((o) => (
              <li
                key={o.value}
                className={`${css.option} ${
                  o.value === value ? css.active : ""
                }`}
                onClick={() => handleSelect(o.value)}
              >
                {o.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
