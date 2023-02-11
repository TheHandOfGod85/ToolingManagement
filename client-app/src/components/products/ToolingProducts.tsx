import {
  Box,
  Button,
  ButtonGroup,
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
import { Link, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import useTooling from "../../app/hooks/tooling/useTooling";
import useDeleteProduct from "../../app/hooks/product/useDeleteProduct";
import useUser from "../../app/hooks/user/useUser";

export default observer(function ToolingProducts() {
  const { id } = useParams<{ id: string }>();
  const { data: singleTooling, isLoading: loading } = useTooling(id!);
  const { data: user } = useUser();
  const deleteProduct = useDeleteProduct();

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
      type: "boolean",
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
                onClick={() => deleteProduct.mutate(params.row.id)}
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

  return (
    <Stack sx={{ height: 400, width: "100%", mt: { xs: 7, md: 9 } }}>
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          mt: 1,
          mb: 1,
          fontSize: { xs: "17px", md: "40px" },
        }}
        fontFamily={"anton"}
        color={"primary"}
      >
        Product List for : {singleTooling?.tNumber} {singleTooling?.psNumber}
      </Typography>
      <DataGrid
        disableSelectionOnClick
        loading={loading}
        autoHeight
        columns={columns}
        rows={singleTooling?.products! || []}
        components={{
          Toolbar: CustomToolbar,
        }}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          "& .MuiDataGrid-row": { bgcolor: "lightblue" },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontFamily: "anton",
            color: "#1976D2",
          },
        }}
      />
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
    </Stack>
  );
});
