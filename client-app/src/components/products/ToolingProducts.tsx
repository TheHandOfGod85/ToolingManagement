import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
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
import { useStore } from "../../app/stores/store";
import ProductConfirmationDialog from "../../app/common/modals/ProductConfirmationDialog";

export default observer(function ToolingProducts() {
  const { id } = useParams<{ id: string }>();
  const { data: singleTooling, isLoading: loading } = useTooling(id!);
  const { data: user } = useUser();
  const { modalStore } = useStore();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

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
                onClick={() =>
                  modalStore.openModal(
                    <ProductConfirmationDialog
                      id={params.row.id}
                      productName={params.row.name}
                    />
                  )
                }
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
    <Stack
      ml={1}
      mr={1}
      sx={{ height: 400, mt: { xs: 7, md: 9 } }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          mt: 1,
          mb: 1,
          fontSize: { xs: "17px", md: "40px", sm: "30px" },
        }}
        fontFamily={"anton"}
        color={"primary"}
      >
        Product List for : {singleTooling?.tNumber} {singleTooling?.psNumber}
      </Typography>
      <DataGrid
        localeText={{
          toolbarExport: xs ? "" : "Export",
          toolbarColumns: xs ? "" : "Columns",
        }}
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
