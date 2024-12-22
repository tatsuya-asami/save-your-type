import HistoryIcon from "@mui/icons-material/History";
import { useChromeStorageSettings } from "../store/useChromeStorageSettings";
import { ListItemInputNumber } from "./ListItemInputNumber";

export const DurationDaysToKeepHistories: React.FC = () => {
  const { settings, updateSettings } = useChromeStorageSettings();

  return (
    <ListItemInputNumber
      icon={<HistoryIcon />}
      label={"days"}
      value={settings.durationDaysToKeepHistories}
      slotProps={{
        htmlInput: { min: 1, max: 180, style: { width: 60 } },
      }}
      handleChange={(e) =>
        updateSettings("durationDaysToKeepHistories", Number(e.target.value))
      }
    />
  );
};
