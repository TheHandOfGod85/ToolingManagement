import { observer } from "mobx-react-lite";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUser from "../hooks/user/useUser";

export default observer(function RequireRole() {
  const { data: user } = useUser();
  const location = useLocation();
  if (user?.role === "Basic") {
    return <Navigate to={"/forbidden"} state={{ from: location }} />;
  }
  return <Outlet />;
});
