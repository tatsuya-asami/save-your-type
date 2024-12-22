import { useState } from "react";
import { TabPanel } from "./TabPanel";
import { Tabs } from "./Tabs";
import { Table } from "./Table";
import Box from "@mui/material/Box";

export const Root: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs
        value={value}
        handleChange={handleChange}
        tabLabels={["Your Types", "Settings"]}
      >
        <TabPanel value={value} index={0}>
          <Table />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Tabs>
    </Box>
  );
};
