import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { Product } from "../../../models/tooling";
import * as Yup from "yup";
import {
  Button,
  ButtonGroup,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import MyTextInput from "../../toolings/form/common/MyTextInput";
import MyCheckBox from "../../toolings/form/common/MyCheckBox";
import { observer } from "mobx-react-lite";
import { router } from "../../../app/router/Routes";

export default observer(function CreateProducts() {
  const { toolingStore, modalStore, productStore } = useStore();

  const { singleTooling, loadTooling } = toolingStore;

  const { createProduct } = productStore;

  const { openModal, closeModal } = modalStore;

  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product>({
    name: "",
    isAllergen: false,
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("The name is required"),
  });

  useEffect(() => {
    if (id) loadTooling(id);
  }, [id, loadTooling]);

  function handleFormSubmit(product: Product) {
    let newProduct = {
      ...product,
      toolingId: id,
    };
    createProduct(newProduct)
      .then(() => router.navigate(`/products/${id}`))
      .then(() => window.location.reload());
  }

  return (
    <Paper sx={{ alignItems: "center", m: 3, mt: 10, height: "100%" }}>
      <Typography textAlign={"center"} variant="h4" mb={3}>
        Create Products Form
      </Typography>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={product}
        onSubmit={(values: Product) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form autoComplete="off">
            <FormGroup row sx={{ mb: 2, justifyContent: "space-evenly" }}>
              <MyTextInput name="name" placeholder="Product Name" />
              <MyCheckBox
                sx={{ ml: 1 }}
                name={"isAllergen"}
                label={"Allergen"}
              ></MyCheckBox>
            </FormGroup>
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
                  to={`/products/${singleTooling?.id}`}
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
  );
});
