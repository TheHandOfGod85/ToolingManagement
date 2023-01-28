import { LoadingButton } from "@mui/lab";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import MyTextInput from "../toolings/form/common/MyTextInput";
import LoginIcon from "@mui/icons-material/Login";
import { Alert, Box, FormGroup, Paper, Typography } from "@mui/material";
import useLogin from "../../app/hooks/user/useLogin";
import * as Yup from "yup";

export default observer(function LoginForm() {
  const login = useLogin();
  const { isLoading: loading } = login;

  return (
    <Box
      sx={{
        margin: 2,
      }}
    >
      <Paper>
        <Formik
          initialValues={{
            email: "",
            password: "",
            error: [],
          }}
          onSubmit={async (values, { setErrors }) => {
            login.mutateAsync(values).catch((error) => setErrors({ error }));
          }}
          validationSchema={Yup.object({
            email: Yup.string().required(),
            password: Yup.string().required(),
          })}
        >
          {({ handleSubmit, isSubmitting, errors, isValid }) => (
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
                  render={() => {
                    return <Alert severity="error">{errors.error}</Alert>;
                  }}
                />
              </Box>
              <FormGroup
                row
                sx={{ padding: 2, justifyContent: "space-between" }}
              >
                <LoadingButton
                  disabled={!isValid}
                  loading={isSubmitting || loading}
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
