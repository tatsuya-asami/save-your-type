import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";

type Props = {
  value: string;
};

export const CopyButton: React.FC<Props> = ({ value }) => {
  return (
    <IconButton onClick={() => navigator.clipboard.writeText(value)}>
      <ContentCopyIcon fontSize="small" />
    </IconButton>
  );
};
