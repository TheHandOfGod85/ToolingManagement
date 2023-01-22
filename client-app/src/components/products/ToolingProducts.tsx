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
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import AddIcon from "@mui/icons-material/Add";
import { toast, ToastContainer } from "react-toastify";

export default observer(function ToolingProducts() {
  const {
    toolingStore,
    userStore: { user },
  } = useStore();
  const { loadTooling, loading, singleTooling } = toolingStore;
  const { deleteProduct } = toolingStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadTooling(id);
  }, [id, loadTooling, deleteProduct]);

  function handleDeleteProduct(productId: number) {
    deleteProduct(productId);
    setTimeout(function () {
      window.location.reload();
    }, 3000);

    toast("Product deleted successfully!", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      theme: "light",
    });
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
                to={`/manage/products/edit/${params.row.id}`}
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
              to={`/manage/products/${singleTooling.id}`}
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
              to={`/manage/products/${singleTooling.id}`}
            >
              <AddIcon />
            </IconButton>
          </>
        ) : null}
      </GridToolbarContainer>
    );
  }

  // if (loading)
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "100vh",
  //       }}
  //     >
  //       <CircularProgress size={20} />
  //       <Typography ml={1}>Loading products...</Typography>
  //     </Box>
  //   );

  return (
    <>
      <Stack sx={{ height: 400, width: "100%", mt: 10 }} height={"100%"}>
        <Typography variant="h4" sx={{ textAlign: "center", mt: 3, mb: 3 }}>
          Product List for {singleTooling.tNumber} {singleTooling.psNumber}
        </Typography>
        <DataGrid
          loading={loading}
          autoHeight
          columns={columns}
          rows={singleTooling.products!}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
        <ToastContainer />
        <Box textAlign="center" mt={2}>
          <Button
            component={Link}
            to={`/toolings/${singleTooling.id}`}
            size="small"
            variant="outlined"
          >
            Cancel
          </Button>
        </Box>
      </Stack>
    </>
  );
});
