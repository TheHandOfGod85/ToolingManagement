import { LoadingButton } from "@mui/lab";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import MyTextInput from "../toolings/form/common/MyTextInput";
import LoginIcon from "@mui/icons-material/Login";
import { Alert, Box, FormGroup, Paper, Typography } from "@mui/material";

export default observer(function LoginForm() {
  const { userStore } = useStore();
  return (
    <Box
      sx={{
        margin: 2,
      }}
    >
      <Paper>
        <Formik
          initialValues={{ email: "", password: "", error: null }}
          onSubmit={(values, { setErrors }) =>
            userStore.login(values).catch((error) => setErrors({ error }))
          }
        >
          {({ handleSubmit, isSubmitting, errors }) => (
            <Form onSubmit={handleSubmit} autoComplete="off">
              <Typography textAlign={"center"} variant="h6">
                Login to Toolings
              </Typography>
              <FormGroup row sx={{ padding: 2, justifyContent: "" }}>
                <MyTextInput name="email" placeholder="Email" fullWidth />
              </FormGroup>
              <FormGroup row sx={{ padding: 2, justifyContent: "" }}>
                <MyTextInput
                  fullWidth
                  name="password"
                  placeholder="Password"
                  type="password"
                />
              </FormGroup>
              <Box
                sx={{
                  ml: 2,
                  mr: 2,
                }}
              >
                <ErrorMessage
                  name="error"
                  render={() => <Alert severity="error">{errors.error}</Alert>}
                />
              </Box>
              <FormGroup
                row
                sx={{ padding: 2, justifyContent: "space-between" }}
              >
                <LoadingButton
                  loading={isSubmitting}
                  variant="contained"
                  type="submit"
                  loadingPosition="start"
                  startIcon={<LoginIcon />}
                >
                  Login
                </LoadingButton>
              </FormGroup>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
});
