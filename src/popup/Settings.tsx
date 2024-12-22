import List from "@mui/material/List";
import Box from "@mui/material/Box";
import { DeleteAllHistories } from "./DeleteAllHistories";
import { DurationToKeepHistories } from "./DurationToKeepHistories";
// import { UrlBlackList } from "./UrlBlackList";

export const Settings: React.FC = () => {
  return (
    <Box width={"max-content"}>
      <List>
        <DeleteAllHistories />
        {/* <UrlBlackList /> */}
        <DurationToKeepHistories />
      </List>
    </Box>
  );
};
