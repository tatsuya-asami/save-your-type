import ListItemText from "@mui/material/ListItemText";
import HistoryIcon from "@mui/icons-material/History";
import TextField from "@mui/material/TextField";
import { ListItem } from "./ListItem";
import { useChromeStorageSettings } from "../store/useChromeStorageSettings";
import { Stack } from "@mui/material";

export const DurationDaysToKeepHistories: React.FC = () => {
  const { settings, updateSettings } = useChromeStorageSettings();

  return (
    <ListItem icon={<HistoryIcon />} handleClick={() => {}}>
      <Stack alignItems={"center"} direction={"row"} spacing={2}>
        <ListItemText primary={"Duration to keep histories"} />
        <ListItemText
          primary={
            <TextField
              slotProps={{
                htmlInput: { min: 1, max: 180, style: { width: 60 } },
              }}
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
      </Stack>
    </ListItem>
  );
};
