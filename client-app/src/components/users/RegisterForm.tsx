import { LoadingButton } from "@mui/lab";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import MyTextInput from "../toolings/form/common/MyTextInput";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Alert, Box, FormGroup, Paper, Typography } from "@mui/material";

import * as Yup from "yup";
import ValidationErrors from "../errors/ValidationErrors";

export default observer(function RegisterForm() {
  const { userStore } = useStore();
  return (
    <Box
      sx={{
        margin: 2,
      }}
    >
      <Paper>
        <Formik
          initialValues={{
            displeyName: "",
            username: "",
            email: "",
            password: "",
            error: null,
          }}
          onSubmit={(values, { setErrors }) =>
            userStore.register(values).catch((error) => setErrors({ error }))
          }
          validationSchema={Yup.object({
            displayName: Yup.string().required(),
            username: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required(),
          })}
        >
          {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
            <Form onSubmit={handleSubmit} autoComplete="off" className="error">
              <Typography textAlign={"center"} variant="h6">
                Sign up to Toolings
              </Typography>
              <FormGroup row sx={{ padding: 2, justifyContent: "" }}>
                <MyTextInput
                  name="displayName"
                  placeholder="Display Name"
                  fullWidth
                />
              </FormGroup>
              <FormGroup row sx={{ padding: 2, justifyContent: "" }}>
                <MyTextInput name="username" placeholder="Username" fullWidth />
              </FormGroup>
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
                  render={() => (
                    <ValidationErrors errors={errors.error}></ValidationErrors>
                  )}
                />
              </Box>
              <FormGroup
                row
                sx={{ padding: 2, justifyContent: "space-between" }}
              >
                <LoadingButton
                  disabled={!isValid || !dirty || isSubmitting}
                  loading={isSubmitting}
                  variant="contained"
                  type="submit"
                  loadingPosition="start"
                  startIcon={<AppRegistrationIcon />}
                >
                  Register
                </LoadingButton>
              </FormGroup>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
});
