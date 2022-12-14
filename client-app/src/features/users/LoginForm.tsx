import { LoadingButton } from "@mui/lab";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import MyTextInput from "../toolings/form/common/MyTextInput";
import SendIcon from "@mui/icons-material/Send";
import { Alert } from "@mui/material";

export default observer(function LoginForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login(values)
          .catch((error) => setErrors({ error: "Invalid email or password" }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput name="email" placeholder="Email" />
          <MyTextInput name="password" placeholder="Password" type="password" />
          <ErrorMessage
            name="error"
            render={() => (
              <Alert severity="error" sx={{ marginBottom: 10 }}>
                {errors.error}
              </Alert>
            )}
          />
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            type="submit"
            loadingPosition="start"
            startIcon={<SendIcon />}
          >
            Login
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
});
