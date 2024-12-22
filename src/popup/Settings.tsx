import { List, ListItem } from "@mui/material";
import Box from "@mui/material/Box";
import { DeleteAllHistories } from "./DeleteAllHistories";

export const Settings: React.FC = () => {
  return (
    <Box>
      <List>
        <ListItem>
          <DeleteAllHistories />
        </ListItem>
      </List>
    </Box>
  );
};
