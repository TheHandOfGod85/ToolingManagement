import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { Product } from "../../../models/tooling";
import * as Yup from "yup";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import MyTextInput from "../../toolings/form/common/MyTextInput";
import MyCheckBox from "../../toolings/form/common/MyCheckBox";
import { observer } from "mobx-react-lite";
import { router } from "../../../app/router/Routes";
import { LoadingButton } from "@mui/lab";
import { toast, ToastContainer } from "react-toastify";

export default observer(function CreateProducts() {
  const { toolingStore } = useStore();

  const { singleTooling, loadTooling, createProduct, loading } = toolingStore;

  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product>({
    id: 0,
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
    createProduct(newProduct);

    setTimeout(function () {
      router.navigate(`/products/${id}`);
    }, 3000);

    toast("Product created!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      theme: "dark",
    });
  }

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={20} />
        <Typography ml={1}>Loading Images...</Typography>
      </Box>
    );

  return (
    <Paper sx={{ alignItems: "center", m: 3, mt: 10, height: "100%" }}>
      <Typography textAlign={"center"} variant="h4" mb={3}>
        Create Products Form
      </Typography>
      <ToastContainer />
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={product}
        onSubmit={(values: Product) => handleFormSubmit(values)}
      >
        {({ isValid, isSubmitting, dirty }) => (
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
                  to={`/products/${singleTooling.id}`}
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
