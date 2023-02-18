import { Stack, useMediaQuery } from "@mui/material";
import { observer } from "mobx-react-lite";
import { theme } from "../../../app/theme/theme";
import MobileTable from "./MobileTable";
import ResponsiveTable from "./ResponsiveTable";

export default observer(function ToolingDashboard() {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  return (
    <Stack ml={1} mr={1} sx={{ mt: { xs: 7, md: 9 } }}>
      {xs || sm ? <MobileTable /> : <ResponsiveTable />}
    </Stack>
  );
});
