import {
  Button,
  ButtonGroup,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import LoginForm from "../../users/LoginForm";
import { HomePageContainer } from "./styles";

export default observer(function HomePage() {
  const { commonStore, userStore, modalStore } = useStore();
  const token = localStorage.getItem("jwt");
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  return (
    <>
      <CssBaseline />
      <HomePageContainer>
        <Grid container direction={"row"} justifyContent={"center"}>
          <Grid item>
            <Typography color={"white"} variant="h5" ml={2}>
              TOOLING MANAGEMENT SYSTEM
            </Typography>
          </Grid>
          {token ? (
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
                <ButtonGroup size="small" variant="contained">
                  <Button onClick={() => modalStore.openModal(<LoginForm />)}>
                    Login
                  </Button>
                  {/* <Button
                    onClick={() => modalStore.openModal(<RegisterForm />)}
                  >
                    Register
                  </Button> */}
                </ButtonGroup>
              </Grid>
            </Grid>
          )}
        </Grid>
      </HomePageContainer>
    </>
  );
});
