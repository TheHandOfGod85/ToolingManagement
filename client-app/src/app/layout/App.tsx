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
import ServerError from "../../components/errors/ServerError";
import Unauthorized from "../../components/errors/Unauthorized";
import Forbidden from "../../components/errors/Forbidden";

function App() {
  const location = useLocation();

  return (
    <>
      <ModalContainer />
      {location.pathname === "/" ? (
        <HomePage />
      ) : location.pathname === "/not-found" ? (
        <NotFound />
      ) : location.pathname === "/server-error" ? (
        <ServerError />
      ) : location.pathname === "/unauthorized" ? (
        <Unauthorized />
      ) : location.pathname === "/forbidden" ? (
        <Forbidden />
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
