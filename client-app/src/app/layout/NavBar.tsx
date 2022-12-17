import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../stores/store";
import React, { useEffect } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import RegisterForm from "../../components/users/RegisterForm";

export default observer(function NavBar() {
  const { userStore, modalStore } = useStore();
  const { user, getUser, logout } = userStore;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    getUser();
  }, [userStore, getUser]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
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
          Home
        </Typography>
        <Tabs>
          <Tab
            label="Toolings"
            
            sx={{
              color: "white",
            }}
          />
          {user?.role === "Admin" ? (
            <Tab
              label="Create user"
              onClick={() => modalStore.openModal(<RegisterForm />)}
              sx={{
                color: "white",
              }}
            />
          ) : null}
        </Tabs>
        {user && (
          <Stack direction={"row"} ml={"auto"} alignItems={"center"}>
            <Typography component={"div"} color={"white"} variant="h6">
              {user.displayName}
            </Typography>
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
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
});
