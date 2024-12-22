import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ListItemText,
} from "@mui/material";
import { ListItem } from "./ListItem";
import BlockIcon from "@mui/icons-material/Block";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export const UrlBlackList: React.FC = () => {
  return (
    <ListItem icon={<BlockIcon />} handleClick={() => {}}>
      <ListItemText
        primary={
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              URL Black List
            </AccordionSummary>
            <AccordionDetails>aaaa</AccordionDetails>
          </Accordion>
        }
      />
    </ListItem>
  );
};
