import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Container, Typography, Box, Button, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Paper sx={{ mt: 2, ml: 2, mr: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box display={"flex"} flexDirection={"row"} mb={1} mt={2}>
          <SearchOffIcon />
          <Typography>We could not find what you are looking for!</Typography>
        </Box>

        <Button
          sx={{ mb: 2 }}
          variant="contained"
          component={Link}
          to={"/"}
          size={"small"}
        >
          Return to Home Page
        </Button>
      </Box>
    </Paper>
  );
}
