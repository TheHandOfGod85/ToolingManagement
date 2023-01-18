import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tooling } from "../../../models/tooling";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "./common/MyTextInput";
import * as Yup from "yup";
import MyTextArea from "./common/MyTextArea";
import MySelectInput from "./common/MySelectInput";
import { departmentOptions } from "./common/options/DepartmentOptions";
import MyCheckBox from "./common/MyCheckBox";
import { v4 as uuid } from "uuid";
import { router } from "../../../app/router/Routes";
import ModalContainer from "../../../app/common/modals/ModalContainer";

export default function CreateToolingForm() {
  const { toolingStore, modalStore, productStore } = useStore();

  const { loadTooling, createTooling, updateTooling } = toolingStore;
  const { loadProducts } = productStore;
  const { openModal, closeModal } = modalStore;

  const { id } = useParams<{ id: string }>();

  const [tooling, setTooling] = useState<Tooling>({
    id: "",
    tNumber: "",
    psNumber: "",
    quantity: 0,
    department: "",
    note: "",
    isInProduction: false,
    numberOfImpressions: 0,
    image: "",
    punnetNumber: "",
    images: [],
    products: [],
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
    if (id) loadTooling(id).then((tool) => setTooling(tool!));
  }, [id, loadTooling]);

  function handleFormSubmit(tooling: Tooling) {
    if (tooling.id.length === 0) {
      let newTooling = {
        ...tooling,
        id: uuid(),
      };
      createTooling(newTooling).then(() => router.navigate(`/toolings`));
      openModal(
        <Alert>
          <AlertTitle>Success!!</AlertTitle>Tooling Created
        </Alert>
      );
    } else {
      updateTooling(tooling).then(() =>
        router.navigate(`/toolings/${tooling.id}`)
      );
      openModal(
        <Alert>
          <AlertTitle>Success!!</AlertTitle>Tooling Modified
        </Alert>
      );
    }
  }

  return (
    <>
      //Main grid container
      <Paper sx={{ alignItems: "center", m: 3, mt: 10, height: "100%" }}>
        {!id ? (
          <Typography textAlign={"center"} variant="h4" mb={3}>
            Create Tooling Form
          </Typography>
        ) : (
          <Typography textAlign={"center"} variant="h4" mb={3}>
            Edit Tooling Form
          </Typography>
        )}

        {/* Container form */}

        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={tooling}
          onSubmit={(values: Tooling) => handleFormSubmit(values)}
        >
          {({
            values: tooling,
            handleSubmit,
            isValid,
            isSubmitting,
            dirty,
          }) => (
            <Form autoComplete="off" onSubmit={handleSubmit}>
              {/* Tnumber and ps number fields */}
              <FormGroup row sx={{ mb: 2, justifyContent: "space-evenly" }}>
                <MyTextInput
                  sx={{ minWidth: 300, mb: { xs: 2, md: 0 } }}
                  name="tNumber"
                  placeholder="T Number"
                />
                <MyTextInput
                  sx={{ minWidth: 300, mb: { xs: 2, md: 0 } }}
                  name="psNumber"
                  placeholder="PS Number"
                />
              </FormGroup>
              {/* quantity and number of impressions fields */}
              <FormGroup row sx={{ mb: 2, justifyContent: "space-evenly" }}>
                <MyTextInput
                  sx={{ minWidth: 300, mb: { xs: 2, md: 0 } }}
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  label="Quantity"
                />
                <MyTextInput
                  sx={{ minWidth: 300, mb: { xs: 2, md: 0 } }}
                  type="number"
                  name="numberOfImpressions"
                  placeholder="Impressions"
                  label="Number Of Impressions"
                />
              </FormGroup>
              {/* department and punnet number fields */}
              <FormGroup row sx={{ mb: 2, justifyContent: "space-evenly" }}>
                <MySelectInput
                  sx={{ minWidth: 300, mb: { xs: 2 } }}
                  name="department"
                  placeholder="Department"
                  label="Department"
                  options={departmentOptions}
                />
                <MyTextInput
                  name="punnetNumber"
                  placeholder="Punnet Number"
                  sx={{ minWidth: 300, mb: { xs: 2, md: 0 } }}
                />
              </FormGroup>

              {/* note field */}
              <FormGroup row sx={{ mb: 2, justifyContent: "space-evenly" }}>
                <MyTextArea
                  name="note"
                  placeholder="Please type a comment..."
                  rows={3}
                />
              </FormGroup>
              {/* checkbox */}
              <FormGroup row sx={{ mb: 2, justifyContent: "space-evenly" }}>
                <MyCheckBox name="isInProduction" label="In Use?" />
              </FormGroup>

              {/* buttons */}
              <FormGroup row sx={{ justifyContent: "space-evenly" }}>
                <ButtonGroup sx={{ mb: 2 }}>
                  <Button
                    disabled={isSubmitting || !dirty || !isValid}
                    type="submit"
                    variant="contained"
                    sx={{ mr: 1 }}
                  >
                    Submit
                  </Button>
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
      <ModalContainer />
    </>
  );
}
