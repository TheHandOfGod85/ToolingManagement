import {
  Button,
  ButtonGroup,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import LoginForm from "../../users/LoginForm";
import { HomePageContainer } from "./styles";

export default observer(function HomePage() {
  const { modalStore } = useStore();
  const token = localStorage.getItem("jwt");

  return (
    <>
      <CssBaseline />
      <HomePageContainer>
        <Grid container direction={"row"} justifyContent={"center"}>
          <Grid item>
            <Typography
              sx={{
                "&:hover": { cursor: "default" },
                
              }}
              color={"white"}
              variant="h3"
              ml={2}
              fontFamily={"anton"}
            >
              TOOLING SYSTEM
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
