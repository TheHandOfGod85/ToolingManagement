import PersonIcon from "@mui/icons-material/Person";
import {
  AppBar,
  MenuItem,
  Paper,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../stores/store";

export default observer(function NavBar() {
  const {
    userStore: { user, logout },
  } = useStore();
  return (
    <AppBar
      position="sticky"
      className="navbar"
      sx={{
        backgroundImage: "linear-gradient(to right bottom, #6a11cb, #2575fc)",
      }}
    >
      <Toolbar
        style={{ display: "flex", justifyContent: "flex-start", gap: "25px" }}
      >
        <Typography
          component={Link}
          to={"/"}
          variant="button"
          sx={{
            display: { xs: "none", sm: "block" },
            color: "white",
            textDecoration: "none",
          }}
        >
          Tooling System
        </Typography>
        <Typography
          component={Link}
          to={"/toolings"}
          variant="button"
          sx={{
            display: { xs: "none", sm: "block" },
            color: "white",
            textDecoration: "none",
          }}
        >
          Toolings
        </Typography>
        <PersonIcon />
        <Select label={user?.displayName} >
          <MenuItem component={Link} to={`/profile/${user?.username}`}>
            My Profile
          </MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Select>
      </Toolbar>
    </AppBar>
  );
});
