import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import { AlertDialog } from "./AlertDialog";
import { useState } from "react";
import { useChromeStorage } from "../store/useChromeStorage";
import { ListItem } from "./ListItem";

export const DeleteAllHistories: React.FC = () => {
  const { removeAllValue } = useChromeStorage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ListItem icon={<DeleteIcon />} handleClick={() => setIsOpen(true)}>
        {<ListItemText primary="Delete all histories" />}
      </ListItem>
      <AlertDialog
        isOpen={isOpen}
        handleCancel={() => setIsOpen(false)}
        handleDelete={() => {
          removeAllValue();
          setIsOpen(false);
        }}
      />
    </>
  );
};
