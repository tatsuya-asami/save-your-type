import MuiListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  text: string;
  handleClick: () => void;
};

export const ListItem: React.FC<Props> = ({ icon, text, handleClick }) => {
  return (
    <MuiListItem>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </MuiListItem>
  );
};
