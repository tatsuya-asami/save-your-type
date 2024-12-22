import ListItemText from "@mui/material/ListItemText";
import HistoryIcon from "@mui/icons-material/History";
import TextField from "@mui/material/TextField";
import { ListItem } from "./ListItem";

export const DurationDaysToKeepHistories: React.FC = () => {
  const durationDays = 30;

  return (
    <ListItem icon={<HistoryIcon />} handleClick={() => {}}>
      <ListItemText
        primary={"Duration to keep histories"}
        secondary={
          <TextField
            variant="standard"
            label="days"
            defaultValue={durationDays}
          />
        }
      />
    </ListItem>
  );
};
