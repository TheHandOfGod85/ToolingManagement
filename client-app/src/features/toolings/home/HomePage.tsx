import { Button, CssBaseline, Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { HomePageContainer } from "./homePage";

export default observer(function HomePage() {
  const { userStore } = useStore();
  return (
    <>
      <CssBaseline />
      <HomePageContainer alignItems={"center"}>
        <Grid container direction={"row"} justifyContent={"center"}>
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
          {userStore.isLoggedIn ? (
            <>
              <Grid
                container
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Grid item mt={3}>
                  <Button
                    size="small"
                    variant="contained"
                    component={Link}
                    to={"/toolings"}
                  >
                    Go to toolings
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : (
            <Grid container direction={"row"} justifyContent={"center"}>
              <Grid item mt={3}>
                <Button
                  size="small"
                  variant="contained"
                  component={Link}
                  to={"/login"}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </HomePageContainer>
    </>
  );
});
