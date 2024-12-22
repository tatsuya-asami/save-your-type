import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DeleteIcon from "@mui/icons-material/Delete";
import { AlertDialog } from "./AlertDialog";
import { useState } from "react";
import { useChromeStorage } from "../store/useChromeStorage";

export const DeleteAllHistories: React.FC = () => {
  const { removeAllValue } = useChromeStorage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ListItemButton onClick={() => setIsOpen(true)}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="Delete all histories" />
      </ListItemButton>
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
