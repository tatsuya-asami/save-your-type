import ListItemText from "@mui/material/ListItemText";
import HistoryIcon from "@mui/icons-material/History";
import TextField from "@mui/material/TextField";
import { ListItem } from "./ListItem";
import { useChromeStorageSettings } from "../store/useChromeStorageSettings";

export const DurationDaysToKeepHistories: React.FC = () => {
  const { settings, updateSettings } = useChromeStorageSettings();

  return (
    <ListItem icon={<HistoryIcon />} handleClick={() => {}}>
      <ListItemText
        primary={"Duration to keep histories"}
        secondary={
          <TextField
            variant="standard"
            label="days"
            type="number"
            value={settings.durationDaysToKeepHistories}
            onChange={(e) =>
              updateSettings(
                "durationDaysToKeepHistories",
                Number(e.target.value)
              )
            }
          />
        }
      />
    </ListItem>
  );
};
