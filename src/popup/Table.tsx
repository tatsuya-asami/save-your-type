import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import { useStorageData } from "./useStorageData";
import { CopyButton } from "./CopyButton";

export const Table: React.FC = () => {
  const { rows } = useTableRows();

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      density="compact"
      disableRowSelectionOnClick
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
  const { storageData } = useStorageData();
  const rows: GridRowsProp<TableRow> =
    storageData
      ?.map((data, index) => {
        return {
          id: index + 1,
          url: data.url,
          text: data.value,
          dom: data.identifier,
          datetime: data.datetime,
        };
      })
      .reverse() ?? [];

  return {
    rows,
  };
};

const columns: GridColDef[] = [
  {
    width: 190,
    field: "url",
    headerName: "URL",
    renderCell: (params) => (
      <>
        <CopyButton value={params.value} />
        <Tooltip title={params.value}>
          <a href={params.value} target="_blank" rel="noopener noreferrer">
            {params.value}
          </a>
        </Tooltip>
      </>
    ),
  },
  {
    width: 250,
    field: "text",
    headerName: "TEXT",
    renderCell: (params) => (
      <>
        <CopyButton value={params.value} />
        <Tooltip title={params.value}>
          <span>{params.value}</span>
        </Tooltip>
      </>
    ),
  },
  {
    width: 100,
    field: "dom",
    headerName: "DOM",
    renderCell: (params) => (
      <>
        <CopyButton value={params.value} />
        <Tooltip title={params.value}>
          <span>{params.value}</span>
        </Tooltip>
      </>
    ),
  },
  {
    width: 180,
    field: "datetime",
    headerName: "DATE TIME",
    renderCell: (params) => (
      <>
        <CopyButton value={params.value} />
        <Tooltip title={params.value}>
          <span>{params.value}</span>
        </Tooltip>
      </>
    ),
  },
];
