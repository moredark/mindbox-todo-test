import { TodoSettings } from "../../types";

export interface TodoSettingsProps {
  settings: TodoSettings;
  onToggleAutoDelete: () => void;
}