import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../stores/store";
import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default observer(function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    userStore: { user, logout },
  } = useStore();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage: "linear-gradient(to right bottom, #6a11cb, #2575fc)",
        }}
      >
        <Toolbar>
          <Typography
            component={Link}
            to={"/"}
            variant="button"
            sx={{
              color: "white",
              textDecoration: "none",
              mr: 2,
            }}
          >
            Tooling System
          </Typography>
          <Typography
            component={Link}
            to={"/toolings"}
            variant="button"
            sx={{
              color: "white",
              textDecoration: "none",
            }}
          >
            Toolings
          </Typography>
          {user && (
            <div style={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
              <Typography component={"div"} color={"white"} variant="h6">
                {user.displayName}
              </Typography>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
});
