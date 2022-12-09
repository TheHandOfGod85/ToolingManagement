import { Box, Typography } from "@mui/material";

import GridTable from "./GridTable";

export default function ToolingDashboard() {
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
      <Box sx={{ mt: 10 }}></Box>
    </>
  );
}
