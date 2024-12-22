import { useState } from "react";
import { TabPanel } from "./TabPanel";
import { Tabs } from "./Tabs";
import { Table } from "./Table";
import Box from "@mui/material/Box";
import { Settings } from "./Settings";
import { useDeleteOldHistories } from "./useDeleteOldHistories";

export const Root: React.FC = () => {
  useDeleteOldHistories();

  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box minHeight={"100svh"}>
      <Tabs
        value={value}
        handleChange={handleChange}
        tabLabels={["Your Types", "Settings"]}
      >
        <TabPanel value={value} index={0}>
          <Table />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Settings />
        </TabPanel>
      </Tabs>
    </Box>
  );
};
