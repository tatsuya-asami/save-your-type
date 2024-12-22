import MuiTabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type Props = {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  tabLabels: string[];
  children: React.ReactNode;
};

export const Tabs: React.FC<Props> = ({
  value,
  handleChange,
  tabLabels,
  children,
}) => {
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <MuiTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabLabels.map((label, index) => (
            <Tab label={label} {...a11yProps(index)} />
          ))}
        </MuiTabs>
      </Box>
      {children}
    </Box>
  );
};
