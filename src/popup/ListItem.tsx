import MuiListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  handleClick: () => void;
  children: ReactNode;
};

export const ListItem: React.FC<Props> = ({ icon, children, handleClick }) => {
  return (
    <MuiListItem>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        {children}
      </ListItemButton>
    </MuiListItem>
  );
};
