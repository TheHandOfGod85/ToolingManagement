import {
  DataGrid,
  GridRenderCellParams,
  GridRenderEditCellParams,
  GridRow,
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
  gridClasses,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import useToolings from "../../../app/hooks/tooling/useToolings";
import useDeleteTooling from "../../../app/hooks/tooling/useDeleteTooling";
import useUser from "../../../app/hooks/user/useUser";

export default observer(function ToolingDashboard() {
  const { data: user } = useUser();
  const { data: toolings, isLoading: loading } = useToolings();
  const { mutate: deleteTooling } = useDeleteTooling();

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
      type: "boolean",
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
      field: "note",
      headerName: "Notes",
      sortable: false,
      disableColumnMenu: true,
      width: 200,
      type: "string",
      renderCell: (params: GridRenderCellParams<string>) => (
        <Box>
          <Typography fontSize={14} variant="body1">
            {params.value === null ? "Nothing to note" : params.value}
          </Typography>
        </Box>
      ),
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
          ) : (
            <ButtonGroup variant="contained" size="small">
              <Button
                component={Link}
                to={`/toolings/${params.row.id}`}
                color="secondary"
              >
                View
              </Button>
            </ButtonGroup>
          )}
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
          </>
        ) : null}
      </GridToolbarContainer>
    );
  }

  return (
    <div>
      <Box sx={{ width: "100%", mt: 10 }} height={"100%"}>
        <Typography
          variant="h2"
          component="h3"
          fontFamily={"anton"}
          color={"#1976D2"}
          sx={{ textAlign: "center", mt: 3, mb: 3 }}
        >
          Manage Toolings
        </Typography>
      </Box>
      <Box height={400} width={"100%"}>
        <DataGrid
          disableSelectionOnClick
          loading={loading}
          columns={columns}
          rows={toolings || []}
          components={{
            Toolbar: CustomToolbar,
          }}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
            "& .MuiDataGrid-row": { bgcolor: "lightblue" },
            "& .MuiDataGrid-columnHeaderTitle": { fontFamily: "anton",color:"#1976D2" },
          }}
        />
      </Box>
    </div>
  );
});
