import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridRenderEditCellParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { Tooling } from "../../models/tooling";
import AddIcon from "@mui/icons-material/Add";

export default observer(function ToolingProducts() {
  const {
    toolingStore,
    productStore,
    userStore: { user },
  } = useStore();
  const { loadTooling, loading, singleTooling } = toolingStore;
  const { deleteProduct } = productStore;
  const { id } = useParams<{ id: string }>();

  const [tooling, setTooling] = useState<Tooling>({
    id: "",
    tNumber: "",
    psNumber: "",
    quantity: 0,
    department: "",
    note: "",
    isInProduction: false,
    numberOfImpressions: 0,
    image: "",
    punnetNumber: "",
    images: [],
    products: [],
  });

  useEffect(() => {
    if (id) loadTooling(id).then((tool) => setTooling(tool!));
  }, [id, loadTooling, handleDeleteProduct]);

  function handleDeleteProduct(productId: number) {
    deleteProduct(productId);
    window.location.reload();
  }

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 220,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "isAllergen",
      headerName: "Allergen",
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderEditCellParams) => {
        return params.row.isAllergen === true ? "Yes" : "No";
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
        <>
          {user?.role === "Admin" ? (
            <ButtonGroup variant="contained" size="small">
              <Button
                component={Link}
                to={`/products/${singleTooling?.id}`}
                color="inherit"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteProduct(params.row.id)}
                color="warning"
              >
                Delete
              </Button>
              {/* <Button
                component={Link}
                to={`/products/${params.row.id}`}
                color="secondary"
              >
                View
              </Button> */}
            </ButtonGroup>
          ) : null}
        </>
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
        {user?.role === "Admin" ? (
          <>
            <Button
              component={Link}
              to={`/manage/products/${singleTooling?.id}`}
              variant="text"
              color="primary"
              size="small"
              sx={{ display: { xs: "none", sm: "flex" } }}
              startIcon={<AddIcon />}
            >
              add product
            </Button>
            <IconButton
              color="primary"
              sx={{ display: { xs: "flex", sm: "none" } }}
              component={Link}
              to={`/manage/products/${singleTooling?.id}`}
            >
              <AddIcon />
            </IconButton>
          </>
        ) : null}
      </GridToolbarContainer>
    );
  }

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={20} />
        <Typography ml={1}>Loading products...</Typography>
      </Box>
    );

  return (
    <>
      <Stack sx={{ height: 400, width: "100%", mt: 10 }} height={"100%"}>
        <Typography variant="h4" sx={{ textAlign: "center", mt: 3, mb: 3 }}>
          Product List for {tooling.tNumber} {tooling.psNumber}
        </Typography>
        <DataGrid
          autoHeight
          columns={columns}
          // rowHeight={120}
          rows={tooling.products!}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </Stack>
      <Box textAlign="center" mt={2}>
        <Button
          component={Link}
          to={`/toolings/${singleTooling?.id}`}
          size="small"
          variant="outlined"
        >
          Cancel
        </Button>
      </Box>
    </>
  );
});
