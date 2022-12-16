import NavBar from "./NavBar";
import { CssBaseline } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import HomePage from "../../components/toolings/home/HomePage";
import ModalContainer from "../common/modals/ModalContainer";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import NotFound from "../../components/errors/NotFound";

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

  return (
    <>
      <ModalContainer />
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <CssBaseline />
          <NavBar />
          <Outlet />
        </>
      )}
    </>
  );
}

export default observer(App);
