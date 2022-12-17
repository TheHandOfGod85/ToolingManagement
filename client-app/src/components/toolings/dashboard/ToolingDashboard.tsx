import { Box, Typography } from "@mui/material";
import { useStore } from "../../../app/stores/store";
import CircularProgress from "@mui/material/CircularProgress";

import GridTable from "./GridTable";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

export default observer(function ToolingDashboard() {
  const { toolingStore } = useStore();
  const { loading } = toolingStore;

  useEffect(() => {
    toolingStore.loadToolings();
  }, [toolingStore]);

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
        <Typography ml={1}>Loading tools...</Typography>
      </Box>
    );
  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <Typography
          variant="h3"
          component="h3"
          sx={{ textAlign: "center", mt: 3, mb: 3 }}
        >
          Manage Toolings
        </Typography>
        <GridTable />
      </Box>
    </>
  );
});
