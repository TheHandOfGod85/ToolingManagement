import { observer } from "mobx-react-lite";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";

export default observer(function RequireRole() {
  const {
    userStore: { user },
  } = useStore();
  const location = useLocation();
  if (user?.role === "Basic") {
    return <Navigate to={"/unauthorized"} state={{ from: location }} />;
  }
  return <Outlet />;
});
