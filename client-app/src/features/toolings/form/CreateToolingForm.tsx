import {
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
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
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { v4 as uuid } from "uuid";
import { router } from "../../../app/router/Routes";

export default function CreateToolingForm() {
  const { toolingStore } = useStore();

  const { loadTooling, createTooling, updateTooling } = toolingStore;

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
    products: Yup.array().of(
      Yup.object({
        name: Yup.string().required("The name of the product is required"),
      })
    ),
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
      createTooling(newTooling).then(() =>
        router.navigate(`/toolings/${newTooling.id}`)
      );
    } else {
      updateTooling(tooling).then(() =>
        router.navigate(`/toolings/${tooling.id}`)
      );
    }
  }

  return (
    //Main grid container
    <Grid
      container
      spacing={0}
      direction="column"
      sx={{ alignItems: "center" }}
    >
      {!id ? (
        <Typography variant="h4" mb={3}>
          Create Tooling Form
        </Typography>
      ) : (
        <Typography variant="h4" mb={3}>
          Edit Tooling Form
        </Typography>
      )}

      {/* Container form */}
      <Grid item xs={3} sm={6}>
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
              <Grid container direction={"column"} spacing={1}>
                {/* Tnumber and ps number fields */}
                <Grid container spacing={1} mb={1}>
                  <MyTextInput name="tNumber" placeholder="T Number" />
                  <MyTextInput name="psNumber" placeholder="PS Number" />
                </Grid>
                {/* quantity and number of impressions fields */}
                <Grid container spacing={1} mb={1}>
                  <MyTextInput
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    label="Quantity"
                  />
                  <MyTextInput
                    type="number"
                    name="numberOfImpressions"
                    placeholder="Impressions"
                    label="Number Of Impressions"
                  />
                </Grid>
                {/* department and punnet number fields */}
                <Grid container spacing={1} mb={1}>
                  <MySelectInput
                    name="department"
                    placeholder="Department"
                    options={departmentOptions}
                  />
                  <MyTextInput
                    name="punnetNumber"
                    placeholder="Punnet Number"
                  />
                </Grid>
                {/* image field */}
                <Grid container spacing={1} mb={1}>
                  <MyTextInput name="image" placeholder="Image" />
                </Grid>
                {/* Field array start */}
                <Grid container spacing={1} mb={1} direction={"column"}>
                  <Grid item xs={12} sm={6}>
                    <FieldArray
                      name="products"
                      render={(arrayHelpers) => (
                        <>
                          <Grid item>
                            <Typography mb={2} variant="h5">
                              Products{" "}
                              <IconButton
                                onClick={() =>
                                  arrayHelpers.push({
                                    name: "",
                                    isAllergen: false,
                                  })
                                }
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Typography>
                          </Grid>
                          {tooling.products.map((product, index) => (
                            <Grid
                              container
                              spacing={1}
                              mb={1}
                              key={index}
                              direction={"row"}
                            >
                              <MyTextInput
                                name={`products[${index}].name`}
                                placeholder={"Product Name"}
                              />
                              <MyCheckBox
                                name={`products[${index}].isAllergen`}
                                label={"Allergen"}
                              ></MyCheckBox>
                              <Grid item>
                                <IconButton
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <RemoveIcon fontSize="small" />
                                </IconButton>
                              </Grid>
                            </Grid>
                          ))}
                          <Grid item></Grid>
                        </>
                      )}
                    />
                  </Grid>
                </Grid>
                {/* Field array end */}
                {/* note field */}
                <Grid container>
                  <MyTextArea
                    name="note"
                    placeholder="Please type a comment..."
                    rows={3}
                  />
                </Grid>
                {/* checkbox */}
                <Grid container mb={5}>
                  <MyCheckBox name="isInProduction" label="In Use?" />
                </Grid>
                {/* buttons */}
                <Grid container>
                  <Grid item>
                    <ButtonGroup>
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
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
}
