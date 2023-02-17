import { Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import ResponsiveTable from "./ResponsiveTable";

export default observer(function ToolingDashboard() {
  return (
    <Stack ml={1} mr={1} sx={{ height: 400, mt: { xs: 7, md: 9 } }}>
      <ResponsiveTable />
    </Stack>
  );
});
