import List from "@mui/material/List";
import Box from "@mui/material/Box";
import { DeleteAllHistories } from "./DeleteAllHistories";
import { DurationDaysToKeepHistories } from "./DurationDaysToKeepHistories";
import { DebounceTimeMs } from "./DebounceTimeMs";
// import { UrlBlackList } from "./UrlBlackList";

export const Settings: React.FC = () => {
  return (
    <Box width={"max-content"}>
      <List>
        <DeleteAllHistories />
        {/* <UrlBlackList /> */}
        <DurationDaysToKeepHistories />
        <DebounceTimeMs />
      </List>
    </Box>
  );
};
