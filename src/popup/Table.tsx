import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import { useStorageData } from "./useStorageData";

export const Table: React.FC = () => {
  const { rows } = useTableRows();

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      onClipboardCopy={(a) => {
        console.log("a", a);
      }}
    />
  );
};

type TableRow = {
  id: number;
  url: string;
  text: string;
  dom: string;
  datetime: string;
};

const useTableRows = (): {
  rows: GridRowsProp<TableRow>;
} => {
  const { currentStorageData } = useStorageData();
  const rows: GridRowsProp<TableRow> =
    currentStorageData?.map((data, index) => {
      return {
        id: index + 1,
        url: data.url,
        text: data.value,
        dom: data.identifier,
        datetime: data.datetime,
      };
    }) ?? [];

  return {
    rows,
  };
};

const columns: GridColDef[] = [
  {
    field: "url",
    headerName: "URL",
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
      </Tooltip>
    ),
  },
  { field: "text", headerName: "TEXT" },
  { field: "dom", headerName: "DOM" },
  { field: "datetime", headerName: "DATE TIME", width: 150 },
];
