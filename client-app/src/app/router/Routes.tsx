import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import NotFound from "../../components/errors/NotFound";
import ServerError from "../../components/errors/ServerError";
import TestErrors from "../../components/errors/TestError";
import ToolingDashboard from "../../components/toolings/dashboard/ToolingDashboard";
import ToolingDetail from "../../components/toolings/details/ToolingDetail";
import CreateToolingForm from "../../components/toolings/form/CreateToolingForm";
import LoginForm from "../../components/users/LoginForm";
import App from "../layout/App";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "toolings", element: <ToolingDashboard /> },
      { path: "createTooling", element: <CreateToolingForm /> },
      { path: "toolings/:id", element: <ToolingDetail /> },
      { path: "manage/:id", element: <CreateToolingForm /> },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "errors", element: <TestErrors /> },
      { path: "*", element: <Navigate replace to={"/not-found"} /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
