import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

type Props = {
  isOpen: boolean;
  handleCancel: () => void;
  handleDelete: () => void;
};

export const AlertDialog: React.FC<Props> = ({
  isOpen,
  handleCancel,
  handleDelete,
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete all histories?
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
