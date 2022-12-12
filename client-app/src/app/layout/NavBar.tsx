import Category from "@mui/icons-material/Category";
import { IconButton } from "@mui/joy";
import { AppBar, Paper, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <AppBar position="sticky" className="navbar">
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
        <Paper
          component={Link}
          to="/"
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <img src="/assets/logo.png" alt="logo" width={30} height={30} />
        </Paper>
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
        <IconButton component={Link} to="/toolings">
          <Category sx={{ display: { xs: "block", sm: "none" } }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
