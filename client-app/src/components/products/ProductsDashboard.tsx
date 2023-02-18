import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import MobileTableProducts from "./MobileTableProducts";
import ProductsTable from "./ProductsTable";

export default observer(function ProductsDashboard() {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));

  return (
    <Stack ml={1} mr={1} sx={{ mt: { xs: 7, md: 9 } }}>
      {xs || sm ? <MobileTableProducts /> : <ProductsTable />}
    </Stack>
  );
});
