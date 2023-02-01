import { LoadingButton } from "@mui/lab";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import MyTextInput from "../toolings/form/common/MyTextInput";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import {
  Alert,
  Autocomplete,
  Box,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";

import * as Yup from "yup";
import ValidationErrors from "../errors/ValidationErrors";
import useGetRoles from "../../app/hooks/user/useGetRoles";
import useUser from "../../app/hooks/user/useUser";
import useRegister from "../../app/hooks/user/useRegister";

export default observer(function RegisterForm() {
  const { data } = useGetRoles();
  const { data: user } = useUser();
  const register = useRegister();

  return (
    <Box
      sx={{
        margin: 2,
      }}
    >
      <Paper>
        <Formik
          initialValues={{
            displayName: "",
            username: "",
            email: "",
            password: "",
            role: "",
            error: [],
          }}
          onSubmit={async (values, { setErrors }) => {
            register.mutateAsync(values).catch((error) => {
              if (error.response) {
                setErrors({ error: error.response.data.details });
              } else {
                setErrors({ error: error });
              }
            });
          }}
          validationSchema={Yup.object({
            displayName: Yup.string().required(),
            username: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required(),
            role: Yup.string().required().nullable(),
          })}
        >
          {({
            handleSubmit,
            isSubmitting,
            errors,
            isValid,
            dirty,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit} autoComplete="off" className="error">
              {user?.role === "Admin" ? (
                <Typography textAlign={"center"} variant="h6">
                  Create a new User
                </Typography>
              ) : (
                <Typography textAlign={"center"} variant="h6">
                  Sign up to Toolings
                </Typography>
              )}

              <FormGroup row sx={{ padding: 2 }}>
                <MyTextInput
                  sx={{ minWidth: 300 }}
                  name="displayName"
                  placeholder="Display Name"
                />
              </FormGroup>
              <FormGroup row sx={{ padding: 2 }}>
                <MyTextInput
                  sx={{ minWidth: 300 }}
                  name="username"
                  placeholder="Username"
                />
              </FormGroup>
              <FormGroup row sx={{ padding: 2 }}>
                <MyTextInput
                  sx={{ minWidth: 300 }}
                  name="email"
                  placeholder="Email"
                />
              </FormGroup>
              <FormGroup row sx={{ padding: 2 }}>
                <MyTextInput
                  sx={{ minWidth: 300 }}
                  name="password"
                  placeholder="Password"
                  type="password"
                />
              </FormGroup>
              {user?.role === "Admin" ? (
                <FormGroup row sx={{ padding: 2 }}>
                  <Autocomplete
                    options={data || []}
                    onChange={(e, newValue) => {
                      setFieldValue("role", newValue);
                    }}
                    renderInput={(params) => {
                      return (
                        <MyTextInput
                          sx={{ minWidth: 300 }}
                          name="role"
                          placeholder="Role"
                          {...params}
                        />
                      );
                    }}
                    getOptionLabel={(roleOption) => `${roleOption}`}
                    renderOption={(props, option) => {
                      return <li {...props}>{`${option}`}</li>;
                    }}
                  />
                </FormGroup>
              ) : null}

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
