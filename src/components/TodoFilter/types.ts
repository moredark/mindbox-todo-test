import { FilterType } from "../../types";

export interface TodoFilterProps {
  activeFilter: FilterType;
  activeCount: number;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
  hasCompleted: boolean;
}
