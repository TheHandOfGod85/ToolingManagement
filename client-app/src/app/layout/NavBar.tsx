import {
  AppBar,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Stack,
  styled,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../stores/store";
import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import RegisterForm from "../../components/users/RegisterForm";
import useUser from "../hooks/user/useUser";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

export default observer(function NavBar() {
  const { data: user } = useUser();
  const { userStore, modalStore } = useStore();
  const { logout } = userStore;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const StyledTypography = styled(Typography)((props) => ({
    "&:hover": { cursor: "pointer" },
  }));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

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
            display: { xs: "none", sm: "block" },
          }}
        >
          Home
        </Typography>
        <IconButton component={Link} to={"/"}>
          <HomeIcon
            fontSize={"small"}
            sx={{ display: { xs: "block", sm: "none" }, color: "white" }}
          />
        </IconButton>
        <IconButton component={Link} to={"/toolings"}>
          <CategoryIcon
            fontSize={"small"}
            sx={{ display: { xs: "block", sm: "none" }, color: "white" }}
          />
        </IconButton>
        <Typography
          component={Link}
          to={"/toolings"}
          variant="button"
          sx={{
            color: "white",
            textDecoration: "none",
            mr: 2,
            display: { xs: "none", sm: "block" },
          }}
        >
          Toolings
        </Typography>
        {user?.role === "Admin" ? (
          <>
            <StyledTypography
              variant="button"
              onClick={() => modalStore.openModal(<RegisterForm />)}
              sx={{
                color: "white",
                display: { xs: "none", sm: "block" },
              }}
            >
              Create User
            </StyledTypography>
            <IconButton onClick={() => modalStore.openModal(<RegisterForm />)}>
              <PersonAddAlt1Icon
                fontSize={"small"}
                sx={{ display: { xs: "block", sm: "none" }, color: "white" }}
              />
            </IconButton>
          </>
        ) : null}
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
                vertical: "bottom",
                horizontal: "center",
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
