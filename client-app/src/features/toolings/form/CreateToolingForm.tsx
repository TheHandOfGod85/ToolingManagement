import { Textarea } from "@mui/joy";
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tooling } from "../../../models/tooling";
import { useStore } from "../../../app/stores/store";
import { values } from "mobx";

export default function CreateToolingForm() {
  const { toolingStore } = useStore();

  const { singleTooling, loadTooling } = toolingStore;

  const { id } = useParams<{ id: string }>();

  const departments = ["Fruit", "Salad", "Stir Fry", ""];

  const [department, setDepartment] = useState("");

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

  useEffect(() => {
    if (id) loadTooling(id).then((tool) => setTooling(tool!));
    console.log(tooling);
  }, [id, loadTooling]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      sx={{ alignItems: "center" }}
    >
      <Grid item xs={3} sm={6}>
        <Formik enableReinitialize initialValues={tooling} onSubmit={() => {}}>
          {({ values: tooling, handleChange, handleSubmit }) => (
            <Form autoComplete="off" onSubmit={handleSubmit}>
              <Grid container direction={"column"} spacing={1}>
                <Grid container spacing={1} mb={1}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="tNumber"
                      label={"T Number"}
                      fullWidth
                      value={tooling.tNumber}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="psNumber"
                      label={"PS Number"}
                      fullWidth
                      value={tooling.psNumber}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} mb={1}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="quantity"
                      label={"Quantity"}
                      type={"number"}
                      fullWidth
                      onChange={handleChange}
                      value={tooling.quantity}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="numberOfImpressions"
                      label={"Impressions"}
                      type={"number"}
                      fullWidth
                      value={tooling.numberOfImpressions}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} mb={1}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="department"
                      label={"Department"}
                      select
                      fullWidth
                      value={department}
                      onChange={handleChange}
                    >
                      {departments.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="punnetNumber"
                      label={"Punnet Number"}
                      fullWidth
                      value={tooling.punnetNumber}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} mb={1}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="image"
                      label={"Image"}
                      fullWidth
                      value={tooling.image}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} mb={1} direction={"column"}>
                  <Grid item xs={12} sm={6}>
                    <FieldArray name="products">
                      {({ push, remove }) => (
                        <>
                          <Grid item>
                            <Typography mb={2} variant="h5">
                              Products :
                            </Typography>
                          </Grid>
                          {tooling.products.map((product) => (
                            <Grid container>
                              <Grid item mb={2}>
                                <TextField
                                  value={product.name}
                                  label={"Product Name"}
                                  name={`products[${product.id}].name`}
                                />
                                <FormControlLabel
                                  sx={{ ml: 2 }}
                                  label={"Allergen"}
                                  control={<Checkbox />}
                                  name={`products[${product.id}].isInProduction`}
                                ></FormControlLabel>
                              </Grid>
                            </Grid>
                          ))}
                        </>
                      )}
                    </FieldArray>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item>
                    <Textarea
                      name="note"
                      placeholder="Type a comment..."
                      minRows={3}
                      sx={{ width: 440 }}
                      value={tooling.note}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container mb={5}>
                  <Grid item>
                    <FormControlLabel
                      label={"In Use"}
                      control={<Checkbox />}
                      value={tooling.isInProduction}
                      onChange={handleChange}
                    ></FormControlLabel>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item>
                    <ButtonGroup>
                      <Button variant="contained" sx={{ mr: 1 }}>
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
