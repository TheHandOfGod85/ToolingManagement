import Category from "@mui/icons-material/Category";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

export default function NavBar() {
  return (
    <AppBar position="sticky">
      <Toolbar
        style={{ display: "flex", justifyContent: "flex-start", gap: "25px" }}
      >
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          Tooling System
        </Typography>
        <Box
          component="img"
          src="/assets/logo.png"
          alt="logo"
          width={30}
          height={30}
          sx={{ display: { xs: "block", sm: "none" } }}
        />
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          Toolings
        </Typography>
        <Category sx={{ display: { xs: "block", sm: "none" } }} />
        <Button
          color="success"
          variant="contained"
          size="small"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Create Tooling
        </Button>
        <AddIcon sx={{ display: { xs: "block", sm: "none" } }} />
      </Toolbar>
    </AppBar>
  );
}
