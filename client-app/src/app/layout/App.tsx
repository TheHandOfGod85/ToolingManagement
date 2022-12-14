import NavBar from "./NavBar";
import { CssBaseline } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Container } from "@mui/system";
import HomePage from "../../features/toolings/home/HomePage";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const { toolingStore, commonStore, userStore } = useStore();
  const location = useLocation();

  useEffect(() => {
    toolingStore.loadToolings();
  }, [toolingStore]);

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <CircularProgress />;

  return (
    <>
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <CssBaseline />
          <Container
            maxWidth={false}
            disableGutters={true}
            sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
          >
            <NavBar />
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);
