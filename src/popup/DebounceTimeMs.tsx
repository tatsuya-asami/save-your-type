import HistoryIcon from "@mui/icons-material/History";
import { useChromeStorageSettings } from "../store/useChromeStorageSettings";
import { ListItemInputNumber } from "./ListItemInputNumber";

export const DebounceTimeMs: React.FC = () => {
  const {
    settings: { debounceTimeMs },
    updateSettings,
  } = useChromeStorageSettings();

  return (
    <ListItemInputNumber
      icon={<HistoryIcon />}
      label={"Debounce time to save typed text"}
      unit={"ms"}
      value={debounceTimeMs}
      slotProps={{
        htmlInput: { min: 100, max: 10000, style: { width: 60 } },
      }}
      handleChange={(e) =>
        updateSettings("debounceTimeMs", Number(e.target.value))
      }
    />
  );
};
