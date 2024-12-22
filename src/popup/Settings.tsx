import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";

export const Settings: React.FC = () => {
  return (
    <Box>
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete all histories" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};
