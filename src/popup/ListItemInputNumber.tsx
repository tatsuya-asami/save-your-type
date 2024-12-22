import ListItemText from "@mui/material/ListItemText";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { ListItem } from "./ListItem";
import { Stack } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  handleClick?: () => void;
  label: string;
  value: number;
  slotProps?: TextFieldProps["slotProps"];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ListItemInputNumber: React.FC<Props> = ({
  icon,
  handleClick,
  value,
  label,
  slotProps,
  handleChange,
}) => {
  return (
    <ListItem icon={icon} handleClick={handleClick}>
      <Stack alignItems={"center"} direction={"row"} spacing={2}>
        <ListItemText primary={"Duration to keep histories"} />
        <ListItemText
          primary={
            <TextField
              slotProps={slotProps}
              variant="standard"
              label={label}
              type="number"
              value={value}
              onChange={handleChange}
            />
          }
        />
      </Stack>
    </ListItem>
  );
};
