import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import Forbidden from "../../components/errors/Forbidden";
import NotFound from "../../components/errors/NotFound";
import ServerError from "../../components/errors/ServerError";
import Unauthorized from "../../components/errors/Unauthorized";
import CreateProducts from "../../components/products/form/CreateProducts";
import EditProduct from "../../components/products/form/EditProduct";
import ProductsDashboard from "../../components/products/ProductsDashboard";
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
          { path: "manage/products/:id", element: <CreateProducts /> },
          { path: "manage/products/edit/:id", element: <EditProduct /> },
        ],
      },
      { path: "toolings", element: <ToolingDashboard /> },
      { path: "products/:id", element: <ProductsDashboard /> },
      { path: "toolings/:id", element: <ToolingDetail /> },
      { path: "images/:id", element: <ToolingImagesDetail /> },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "unauthorized", element: <Unauthorized /> },
      { path: "forbidden", element: <Forbidden /> },
      { path: "*", element: <Navigate replace to={"/not-found"} /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
