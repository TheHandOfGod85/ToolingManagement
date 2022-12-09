import { Textarea } from "@mui/joy";
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Tooling } from "../../../app/layout/models/tooling";
import { useStore } from "../../../app/stores/store";

export default function CreateToolingForm() {
  const { toolingStore } = useStore();

  const { toolings, singleTooling } = toolingStore;

  const departments = ["Fruit", "Salad", "Stir Fry", ""];

  const [department, setDepartment] = useState("");

  const [tooling, setTooling] = useState<Tooling>({
    id: "",
    tNumber: "",
    psNumber: "",
    quantity: null,
    department: "",
    note: "",
    isInProduction: false,
    numberOfImpressions: null,
    image: "",
    punnetNumber: "",
    products: [],
  });

  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      sx={{ alignItems: "center" }}
    >
      <Grid item xs={3} sm={6}>
        <Formik initialValues={tooling} onSubmit={() => {}}>
          {({ values: tooling, handleChange, handleSubmit }) => (
            <Form autoComplete="off">
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
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="products"
                      label={"Products"}
                      fullWidth
                      value={tooling.products}
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item>
                    <Textarea
                      placeholder="Type a comment..."
                      minRows={3}
                      sx={{ width: 440 }}
                      value={tooling.note}
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
