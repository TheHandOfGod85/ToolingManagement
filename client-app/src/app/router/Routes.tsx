import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import Forbidden from "../../components/errors/Forbidden";
import NotFound from "../../components/errors/NotFound";
import ServerError from "../../components/errors/ServerError";
import TestErrors from "../../components/errors/TestError";
import Unauthorized from "../../components/errors/Unauthorized";
import ToolingDashboard from "../../components/toolings/dashboard/ToolingDashboard";
import ToolingDetail from "../../components/toolings/details/ToolingDetail";
import ToolingImagesDetail from "../../components/toolings/details/ToolingImagesDetail";
import CreateToolingForm from "../../components/toolings/form/CreateToolingForm";
import App from "../layout/App";
import RequireRole from "./RequireRole";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireRole />,
        children: [
          { path: "createTooling", element: <CreateToolingForm /> },
          { path: "manage/:id", element: <CreateToolingForm /> },
        ],
      },
      { path: "toolings", element: <ToolingDashboard /> },
      { path: "toolings/:id", element: <ToolingDetail /> },
      { path: "images/:id", element: <ToolingImagesDetail /> },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "unauthorized", element: <Unauthorized /> },
      { path: "forbidden", element: <Forbidden /> },
      { path: "errors", element: <TestErrors /> },
      { path: "*", element: <Navigate replace to={"/not-found"} /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
