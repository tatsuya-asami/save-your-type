import HistoryIcon from "@mui/icons-material/History";
import { useChromeStorageSettings } from "../store/useChromeStorageSettings";
import { ListItemInputNumber } from "./ListItemInputNumber";

export const DebounceTimeMs: React.FC = () => {
  const {
    settings: { debounceTime },
    updateSettings,
  } = useChromeStorageSettings();

  return (
    <ListItemInputNumber
      icon={<HistoryIcon />}
      label={"ms"}
      value={debounceTime}
      slotProps={{
        htmlInput: { min: 100, max: 10000, style: { width: 60 } },
      }}
      handleChange={(e) =>
        updateSettings("debounceTime", Number(e.target.value))
      }
    />
  );
};
