import {
  DataGrid,
  GridRenderEditCellParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import { Product } from "../../../models/tooling";
import AddIcon from "@mui/icons-material/Add";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export default observer(function GridTable() {
  const { toolingStore } = useStore();
  const { toolings, deleteTooling } = toolingStore;


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
    {
      field: "punnetNumber",
      headerName: "Punnet Number",
      width: 130,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "product",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderEditCellParams) => (
        <Box sx={{ maxHeight: 200, overflow: "auto" }}>
          <List>
            {params.row.products.map((product: Product) => (
              <ListItem key={product.name}>{product.name}</ListItem>
            ))}
          </List>
        </Box>
      ),
      type: "string",
      headerName: "Product Name",
      width: 200,
    },
    {
      field: "note",
      headerName: "Notes",
      sortable: false,
      disableColumnMenu: true,
      width: 200,
      type: "string",
      renderCell: (params: GridRenderEditCellParams) => {
        return params.row.note === null ? "Nothing to note" : params.row.note;
      },
    },
    {
      field: "col7",
      headerName: " ",
      width: 200,
      sortable: false,
      editMode: "row",
      disableColumnMenu: true,
      renderCell: (params: GridRenderEditCellParams) => (
        <ButtonGroup variant="contained" size="small">
          <Button
            component={Link}
            to={`/manage/${params.row.id}`}
            color="inherit"
          >
            Edit
          </Button>
          <Button
            onClick={() => deleteTooling(params.row.id)}
            color="warning"
          >
            Delete
          </Button>
          <Button
            component={Link}
            to={`/toolings/${params.row.id}`}
            color="secondary"
          >
            View
          </Button>
        </ButtonGroup>
      ),
    },
  ];
  // custom toolbar to sort and export the table
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Button
          // onClick={openForm}
          component={Link}
          to={"/createTooling"}
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
          component={Link}
          to={"/createTooling"}
        >
          <AddIcon />
        </IconButton>
      </GridToolbarContainer>
    );
  }
  return (
    <>
      <DataGrid
        sx={{ height: 400 }}
        columns={columns}
        rows={toolings}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
      {/* <AddToolingModal open={open} onClose={() => setOpen(false)} />; */}
    </>
  );
});
