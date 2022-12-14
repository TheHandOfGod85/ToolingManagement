import { createBrowserRouter, RouteObject } from "react-router-dom";
import ToolingDashboard from "../../features/toolings/dashboard/ToolingDashboard";
import ToolingDetail from "../../features/toolings/details/ToolingDetail";
import CreateToolingForm from "../../features/toolings/form/CreateToolingForm";
import LoginForm from "../../features/users/LoginForm";
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
      { path: "login", element: <LoginForm /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
