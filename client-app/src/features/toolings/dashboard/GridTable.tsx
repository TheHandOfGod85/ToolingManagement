import React, { useState } from "react";
import {
  DataGrid,
  GridRenderEditCellParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import { Tooling } from "../../../app/layout/models/tooling";
import AddToolingModal from "../form/AddToolingModal";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  toolings: Tooling[];
}

export default function GridTable({ toolings }: Props) {
  // columns set up for the grid table
  const columns = [
    {
      field: "tNumber",
      headerName: "T Number",
      width: 120,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "psNumber",
      headerName: "PS Number",
      width: 120,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 120,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "department",
      headerName: "Department",
      width: 120,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "isInProduction",
      headerName: "In Use",
      sortable: false,
      disableColumnMenu: true,
      width: 120,
      renderCell: (params: GridRenderEditCellParams) => {
        return params.row.isInProduction === true ? "Yes" : "No";
      },
    },
    {
      field: "numberOfImpressions",
      headerName: "Impressions",
      sortable: false,
      disableColumnMenu: true,
      width: 147,
    },
    { field: "punnetNumber", headerName: "Punnet Number", width: 120 },
    {
      field: "product",
      sortable: false,
      disableColumnMenu: true,
      valueGetter: (params: GridRenderEditCellParams) => {
        return params.row.product.name;
      },
      headerName: "Product Name",
      width: 200,
    },
    {
      field: "note",
      headerName: "Notes",
      sortable: false,
      disableColumnMenu: true,
      width: 200,
      renderCell: (params: GridRenderEditCellParams) => {
        return params.row.note === null ? "No Notes to show" : params.row.note;
      },
    },
    {
      field: "col7",
      headerName: "Edit",
      width: 150,
      sortable: false,
      editMode: "row",
      disableColumnMenu: true,
      renderCell: () => (
        <ButtonGroup variant="contained" size="small">
          <Button color="inherit">Edit</Button>
          <Button color="warning">Delete</Button>
        </ButtonGroup>
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  function openForm() {
    return setOpen(true);
  }
  // custom toolbar to sort and export the table
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Button
          onClick={openForm}
          variant="text"
          color="primary"
          size="small"
          sx={{ display: { xs: "none", sm: "flex" } }}
          startIcon={<AddIcon />}
        >
          add tooling
        </Button>
        <IconButton
          color="primary"
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={openForm}
        >
          <AddIcon />
        </IconButton>
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <DataGrid
        columns={columns}
        rows={toolings}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
      <AddToolingModal open={open} onClose={() => setOpen(false)} />;
    </>
  );
}
