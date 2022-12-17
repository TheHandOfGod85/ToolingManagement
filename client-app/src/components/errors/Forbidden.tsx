import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Typography, Box, Button, Paper } from "@mui/material";
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
        <Typography variant="h2">FORBIDDEN</Typography>
        <Box display={"flex"} flexDirection={"row"} mb={1} mt={2}>
          <SearchOffIcon />
          <Typography>
            You don`t have permission to access this resource!
          </Typography>
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
