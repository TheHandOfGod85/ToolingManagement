import {
  Button,
  ButtonGroup,
  CircularProgress,
  FormGroup,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tooling } from "../../../models/tooling";
import MyTextInput from "./common/MyTextInput";
import * as Yup from "yup";
import MyTextArea from "./common/MyTextArea";
import MySelectInput from "./common/MySelectInput";
import { departmentOptions } from "./common/options/DepartmentOptions";
import MyCheckBox from "./common/MyCheckBox";
import ModalContainer from "../../../app/common/modals/ModalContainer";
import { ToastContainer } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import useTooling from "../../../app/hooks/tooling/useTooling";
import useCreateTooling from "../../../app/hooks/tooling/useCreateTooling";
import useUpdateTooling from "../../../app/hooks/tooling/useUpdateTooling";

export default function CreateToolingForm() {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching: loading } = useTooling(id!);
  const createTooling = useCreateTooling();
  const updateTooling = useUpdateTooling();

  const [tooling, setTooling] = useState<Tooling>({
    id: "",
    tNumber: "",
    psNumber: "",
    quantity: undefined,
    department: "",
    note: "",
    isInProduction: false,
    numberOfImpressions: undefined,
    image: "",
    punnetNumber: "",
  });

  const validationSchema = Yup.object({
    tNumber: Yup.string().required("The T Number is required"),
    psNumber: Yup.string().required("The PS Number is required"),
    quantity: Yup.number().required("The quantity is required"),
    numberOfImpressions: Yup.number().required(
      "The number of impressions is required"
    ),
    punnetNumber: Yup.string().required("The Punnet Number is required"),
    department: Yup.string().required("The Department is required"),
  });

  useEffect(() => {
    if (id) {
      setTooling(data!);
    }
  }, [data]);

  function handleFormSubmit(tooling: Tooling) {
    if (!tooling.id) {
      let newTooling = {
        ...tooling,
      };
      createTooling.mutate(newTooling);
    } else {
      updateTooling.mutate(tooling);
    }
  }

  return (
    <Stack sx={{ height: 400, mt: { xs: 8, md: 9 }, ml: 1, mr: 1 }}>
      <Paper>
        {!id ? (
          <Typography
            textAlign={"center"}
            variant="h3"
            sx={{ mt: 1, mb: 1, fontSize: { xs: "17px", md: "40px" } }}
            fontFamily={"anton"}
            color={"primary"}
          >
            Create Tooling Form
          </Typography>
        ) : (
          <Typography
            textAlign={"center"}
            variant="h3"
            sx={{ mt: 1, mb: 1, fontSize: { xs: "17px", md: "40px" } }}
            fontFamily={"anton"}
            color={"primary"}
          >
            Edit Tooling Form
          </Typography>
        )}

        {/* Container form */}

        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={tooling}
          onSubmit={(values) => handleFormSubmit(values)}
        >
          {({ handleSubmit, isValid, isSubmitting, dirty }) => (
            <Form autoComplete="off" onSubmit={handleSubmit}>
              {/* Tnumber and ps number fields */}
              <FormGroup row sx={{ mb: 2, justifyContent: "space-evenly" }}>
                <MyTextInput
                  sx={{ minWidth: { xs: 250, md: 300 }, mb: { xs: 2, md: 0 } }}
                  name="tNumber"
                  placeholder="T Number"
                  InputProps={{
                    endAdornment: loading && !tooling?.tNumber && (
                      <CircularProgress size={18} />
                    ),
                  }}
                />

                <MyTextInput
                  sx={{ minWidth: { xs: 250, md: 300 }, mb: { xs: 2, md: 0 } }}
                  name="psNumber"
                  placeholder="PS Number"
                  InputProps={{
                    endAdornment: loading && !tooling?.psNumber! && (
                      <CircularProgress size={18} />
                    ),
                  }}
                />
              </FormGroup>
              {/* quantity and number of impressions fields */}
              <FormGroup row sx={{ mb: 2, justifyContent: "space-evenly" }}>
                <MyTextInput
                  sx={{ minWidth: { xs: 250, md: 300 }, mb: { xs: 2, md: 0 } }}
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  label="Quantity"
                  InputProps={{
                    inputProps: { min: 0 },
                    endAdornment: loading && !tooling?.quantity && (
                      <CircularProgress size={18} />
                    ),
                  }}
                />
                <MyTextInput
                  sx={{ minWidth: { xs: 250, md: 300 }, mb: { xs: 2, md: 0 } }}
                  type="number"
                  name="numberOfImpressions"
                  placeholder="Impressions"
                  label="Number Of Impressions"
                  InputProps={{
                    inputProps: { min: 0 },
                    endAdornment: loading && !tooling?.numberOfImpressions && (
                      <CircularProgress size={18} />
                    ),
                  }}
                />
              </FormGroup>
              {/* department and punnet number fields */}
              <FormGroup row sx={{ mb: 2, justifyContent: "space-evenly" }}>
                <MySelectInput
                  sx={{ minWidth: { xs: 250, md: 300 }, mb: { xs: 2 } }}
                  name="department"
                  placeholder="Department"
                  label="Department"
                  options={departmentOptions}
                  InputProps={{
                    endAdornment: loading && !tooling?.department && (
                      <CircularProgress
                        size={20}
                        sx={{ position: "relative", right: "15px" }}
                      />
                    ),
                  }}
                />
                <MyTextInput
                  name="punnetNumber"
                  placeholder="Punnet Number"
                  sx={{ minWidth: { xs: 250, md: 300 }, mb: { xs: 2, md: 0 } }}
                  InputProps={{
                    endAdornment: loading && !tooling?.punnetNumber && (
                      <CircularProgress size={18} />
                    ),
                  }}
                />
              </FormGroup>

              {/* note field */}
              <FormGroup row sx={{ mb: 2, justifyContent: "space-evenly" }}>
                <MyTextArea
                  name="note"
                  placeholder="Please type a comment..."
                  rows={3}
                  InputProps={{
                    endAdornment: loading && !tooling?.note && (
                      <CircularProgress size={18} />
                    ),
                  }}
                />
              </FormGroup>
              {/* checkbox */}
              <FormGroup row sx={{ mb: 2, justifyContent: "space-evenly" }}>
                <MyCheckBox name="isInProduction" label="In Use?" />
              </FormGroup>

              {/* buttons */}
              <FormGroup row sx={{ justifyContent: "space-evenly" }}>
                <ButtonGroup sx={{ mb: 2 }}>
                  <LoadingButton
                    loading={isSubmitting}
                    disabled={isSubmitting || !dirty || !isValid}
                    type="submit"
                    variant="contained"
                    sx={{ mr: 1 }}
                  >
                    Submit
                  </LoadingButton>
                  <Button
                    component={Link}
                    to={"/toolings"}
                    variant="contained"
                    color="error"
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </FormGroup>
            </Form>
          )}
        </Formik>
      </Paper>
    </Stack>
  );
}
