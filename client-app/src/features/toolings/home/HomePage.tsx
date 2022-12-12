import { Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Image } from "mui-image";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Container>
      <Grid
        className="masthead"
        container
        direction={"row"}
        justifyContent={"center"}
      >
        <Grid item>
          <Image src="/assets/logo.png" width={80} height={50} />
        </Grid>
        <Grid item>
          <Typography
            color={"white"}
            className="masthead-h5"
            variant="h5"
            ml={2}
          >
            TOOLING MANAGEMENT SYSTEM
          </Typography>
        </Grid>
        <Grid container direction={"row"} justifyContent={"center"}>
          <Grid item>
            <Button
              size="small"
              variant="contained"
              component={Link}
              to={"/toolings"}
            >
              toolings
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
