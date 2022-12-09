import NavBar from "./NavBar";
import ToolingDashboard from "../../features/toolings/dashboard/ToolingDashboard";
import { Grid } from "@mui/material";
import { Route } from "react-router-dom";
import HomePage from "../../features/toolings/home/HomePage";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import CreateToolingForm from "../../features/toolings/form/CreateToolingForm";

function App() {
  const { toolingStore } = useStore();

  useEffect(() => {
    toolingStore.loadToolings();
  }, [toolingStore]);

  return (
    <>
      <NavBar />
      <Grid container sx={{ mt: "7em" }}>
        <Route exact path={"/"} component={HomePage} />
        <Route exact path={"/toolings"} component={ToolingDashboard} />
        <Route exact path={"/createTooling"} component={CreateToolingForm} />
      </Grid>
    </>
  );
}

export default observer(App);
