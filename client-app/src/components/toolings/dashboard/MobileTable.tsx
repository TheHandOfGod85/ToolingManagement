import {
  Box,
  Button,
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
  useTheme,
  Stack,
  MenuItem,
  ListItem,
  ListItemIcon,
  List,
  ListItemText,
} from "@mui/material";
import useToolings from "../../../app/hooks/tooling/useToolings";
import useUser from "../../../app/hooks/user/useUser";
import { useStore } from "../../../app/stores/store";
import { useMemo, useState } from "react";
import { Tooling } from "../../../models/tooling";
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
import LaunchIcon from "@mui/icons-material/Launch";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ToolingConfirmationDialog from "../../../app/common/modals/ToolingConfirmationDialog";
import { router } from "../../../app/router/Routes";
import { observer } from "mobx-react-lite";

export default observer(function MobileTable() {
  const { data: user } = useUser();
  const { data: toolings, isLoading: loading } = useToolings();
  const { modalStore } = useStore();
  const theme = useTheme();

  const data = useMemo(() => toolings || [], [toolings]);

  const columnHelper = createColumnHelper<Tooling>();

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
      cell: (info) => info.getValue(),
      enableGlobalFilter: false,
    }),
    columnHelper.accessor("tNumber", { cell: (props) => props.getValue() }),
    columnHelper.accessor("department", {
      cell: (props) => props.getValue(),
      enableGlobalFilter: true,
    }),
    columnHelper.accessor("psNumber", {
      cell: (props) => props.getValue(),
      enableGlobalFilter: true,
    }),
    columnHelper.display({
      id: "actions",
      cell: (props) => (
        <>
          {user && user?.role === "Admin" ? (
            <List dense>
              <ListItem>
                <ListItemText
                  primary={props.row.original.psNumber}
                  secondary={
                    <>
                      <Typography variant="body2" component={"span"}>
                        {props.row.original.department}
                      </Typography>
                    </>
                  }
                ></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <IconButton
                    onClick={() =>
                      router.navigate(`/manage/${props.row.original.id}`)
                    }
                    color="inherit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      modalStore.openModal(
                        <ToolingConfirmationDialog
                          id={props.row.original.id}
                          toolingNumber={props.row.original.tNumber}
                        />
                      )
                    }
                    color={"warning"}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      router.navigate(`/toolings/${props.row.original.id}`)
                    }
                    color="primary"
                  >
                    <LaunchIcon />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            </List>
          ) : (
            <ListItem>
              <ListItemIcon>
                <IconButton
                  onClick={() =>
                    router.navigate(`/toolings/${props.row.original.id}`)
                  }
                  color="secondary"
                >
                  <LaunchIcon />
                </IconButton>
              </ListItemIcon>
            </ListItem>
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
      columnVisibility: { id: false, psNumber: false, department: false },
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
        variant={"h3"}
        fontFamily={"anton"}
        color={"primary"}
        sx={{
          textAlign: "center",
          mt: { xs: 2, md: 1 },
          mb: 1,
          fontSize: { xs: "17px", md: "40px" },
        }}
      >
        Manage Toolings
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
                onClick={() => router.navigate("/createTooling")}
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
                onClick={() => router.navigate("/createTooling")}
              >
                <AddIcon />
              </IconButton>
            </>
          ) : null}
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
          <Box ml={1}>
            <Box
              component={"span"}
              display={"flex"}
              alignItems={"center"}
              mb={1}
            >
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
                  "& .MuiOutlinedInput-input": { height: "0.4rem" },
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
                "& .css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                  {
                    minHeight: "0.4rem",
                    maxHeight: "0.4rem",
                    fontSize: "10px",
                    transform: "translate(0,-40%)",
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
    </>
  );
});
