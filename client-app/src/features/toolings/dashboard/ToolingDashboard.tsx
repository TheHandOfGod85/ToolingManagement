import { Box, Button, Typography } from "@mui/material";
import {
  DataGrid,
  GridRenderEditCellParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Tooling } from "../../../app/layout/models/tooling";

interface Props {
  toolings: Tooling[];
}
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function ToolingDashboard({ toolings }: Props) {
  const columns = [
    { field: "tNumber", headerName: "T Number", width: 120 },
    { field: "psNumber", headerName: "PS Number", width: 120 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "department", headerName: "Department", width: 120 },
    {
      field: "isInProduction",
      headerName: "Is in Production",
      width: 120,
      renderCell: (params: GridRenderEditCellParams) => {
        return params.row.isInProduction === true ? "Yes" : "No";
      },
    },
    {
      field: "numberOfImpressions",
      headerName: "Number Impressions",
      width: 147,
    },
    { field: "punnetNumber", headerName: "Punnet Number", width: 120 },
    {
      field: "product",
      valueGetter: (params: GridRenderEditCellParams) => {
        return params.row.product.name;
      },
      headerName: "Product Name",
      width: 200,
    },
    {
      field: "note",
      headerName: "Notes",
      width: 200,
      renderCell: (params: GridRenderEditCellParams) => {
        return params.row.note === null ? "No Notes to show" : params.row.note;
      },
    },
  ];
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Manage Toolings
      </Typography>
      <DataGrid
        columns={columns}
        rows={toolings}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </Box>
  );
}
