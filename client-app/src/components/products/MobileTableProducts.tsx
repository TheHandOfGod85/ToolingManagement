import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Stack,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useMemo, useState } from "react";
import {
  createColumnHelper,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { observer } from "mobx-react-lite";
import ProductConfirmationDialog from "../../app/common/modals/ProductConfirmationDialog";
import useUser from "../../app/hooks/user/useUser";
import { useStore } from "../../app/stores/store";
import { Product } from "../../models/tooling";
import { router } from "../../app/router/Routes";
import { useParams } from "react-router-dom";
import useTooling from "../../app/hooks/tooling/useTooling";

export default observer(function MobileTableProducts() {
  const { id } = useParams<{ id: string }>();
  const { data: singleTooling, isLoading: loading } = useTooling(id!);
  const { data: user } = useUser();
  const { modalStore } = useStore();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));

  const data = useMemo(
    () => singleTooling?.products || [],
    [singleTooling?.products]
  );

  const columnHelper = createColumnHelper<Product>();

  const fuzzyFilter = (row: any, columnId: any, filterValue: any) => {
    const safeValue = (() => {
      const value = row.getValue(columnId);
      return typeof value === "number" ? String(value) : value;
    })();

    return safeValue?.toLowerCase().includes(filterValue.toLowerCase());
  };
  const [globalFilter, setGlobalFilter] = useState("");

  const COLUMNS = [
    columnHelper.accessor("id", {
      enableGlobalFilter: false,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),

    columnHelper.display({
      id: "actions",
      cell: (props) => (
        <>
          {user?.role === "Admin" ? (
            <List>
              <ListItem>
                <ListItemText
                  primary={"Is allergen?"}
                  secondary={
                    <>
                      {props.row.original.isAllergen === true ? (
                        <Typography>Yes</Typography>
                      ) : (
                        <Typography>No</Typography>
                      )}
                    </>
                  }
                ></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <IconButton
                    onClick={() =>
                      router.navigate(
                        `/manage/products/edit/${props.row.original.id}`
                      )
                    }
                    color="inherit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      modalStore.openModal(
                        <ProductConfirmationDialog
                          id={props.row.original.id}
                          productName={props.row.original.name}
                        />
                      )
                    }
                    color={"warning"}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            </List>
          ) : (
            <List>
              <ListItem>
                <ListItemText
                  primary={"Is allergen?"}
                  secondary={
                    <>
                      {props.row.original.isAllergen === true ? (
                        <Typography>Yes</Typography>
                      ) : (
                        <Typography>No</Typography>
                      )}
                    </>
                  }
                ></ListItemText>
              </ListItem>
            </List>
          )}
        </>
      ),
    }),
  ];
  const columns = useMemo(() => COLUMNS, [COLUMNS]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    initialState: {
      columnVisibility: { id: false },
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
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
        <Typography ml={1}>Loading toolings...</Typography>
      </Box>
    );

  return (
    <>
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
      <TableContainer component={Paper}>
        <Box
          display="flex"
          justifyContent="space-between"
          mb={1}
          mt={2}
          mr={1}
          ml={1}
        >
          {user?.role === "Admin" ? (
            <>
              <Button
                onClick={() => router.navigate(`/manage/products/${id}`)}
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
                onClick={() => router.navigate(`/manage/products/${id}`)}
              >
                <AddIcon />
              </IconButton>
            </>
          ) : (
            <div></div>
          )}
          <TextField
            size="small"
            value={globalFilter ?? ""}
            variant="outlined"
            placeholder="search..."
            type="search"
            onChange={(value) => setGlobalFilter(value.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <div></div>
        </Box>
        <Table stickyHeader size="small">
          {/* <TableHead>
            {table.getHeaderGroups().map((headergroup) => (
              <TableRow key={headergroup.id}>
                {headergroup.headers.map((header) => (
                  <TableCell
                    component={"th"}
                    key={header.id}
                    sx={{
                      whiteSpace: "nowrap",
                      width: "0.1%",
                      fontFamily: "anton",
                      color: theme.palette.primary.main,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead> */}
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: "lightblue",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    sx={{
                      fontFamily: "anton",
                      color: theme.palette.primary.main,
                      fontSize: "18px",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Stack
          alignContent={"center"}
          direction={"column"}
          alignItems={"center"}
          mt={0}
          mb={1}
        >
          <Box sx={{ whiteSpace: "nowrap" }}>
            <IconButton
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <KeyboardDoubleArrowLeftIcon />
            </IconButton>
            <IconButton
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon />
            </IconButton>
            <IconButton
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <KeyboardDoubleArrowRightIcon />
            </IconButton>
          </Box>
          <Box display={"flex"}>
            <Typography
              sx={{
                fontSize: { xs: "12px", md: "15px" },
              }}
              mr={1}
            >
              Page
            </Typography>
            <Typography
              sx={{
                whiteSpace: "nowrap",
                fontSize: { xs: "12px", md: "15px" },
              }}
            >
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </Typography>
          </Box>
          <Box mb={1}>
            <Box component={"span"} display={"flex"} alignItems={"center"}>
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  fontSize: { xs: "12px", md: "15px" },
                }}
                mr={1}
              >
                Go to page :
              </Typography>
              <TextField
                InputProps={{
                  inputProps: { min: 1 },
                }}
                size={"small"}
                sx={{
                  maxWidth: 60,
                  minWidth: 60,
                  "& .MuiOutlinedInput-input": {
                    height: "0.4rem",
                    fontSize: "12px",
                  },
                }}
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
              />
            </Box>
          </Box>
          <Box ml={1}>
            <TextField
              size="small"
              select
              sx={{
                "& .css-f09v0h-MuiInputBase-root-MuiOutlinedInput-root": {
                  height: "1.5rem",
                  fontSize: "10px",
                },
              }}
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 15].map((pageSize) => (
                <MenuItem key={pageSize} value={pageSize}>
                  Show {pageSize}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Stack>
      </TableContainer>
      <Box textAlign="center" mt={2}>
        <Button
          onClick={() => router.navigate(`/toolings/${singleTooling?.id}`)}
          size="small"
          variant="outlined"
        >
          Cancel
        </Button>
      </Box>
    </>
  );
});
