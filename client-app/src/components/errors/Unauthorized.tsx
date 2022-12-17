import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { Typography, Box, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";

export default function Unauthorized() {
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
          <DoNotDisturbIcon />
          <Typography>You do not have authorization to get here!</Typography>
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
