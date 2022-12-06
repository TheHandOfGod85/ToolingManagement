import { Box, Button, ButtonGroup, Typography } from "@mui/material";

import { Tooling } from "../../../app/layout/models/tooling";
import GridTable from "./GridTable";

interface Props {
  toolings: Tooling[];
}

export default function ToolingDashboard({ toolings }: Props) {
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
        <GridTable toolings={toolings} />
      </Box>
      <Box sx={{ mt: 10 }}>
      </Box>
    </>
  );
}
