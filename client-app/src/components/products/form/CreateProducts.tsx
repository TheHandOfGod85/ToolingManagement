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
import useTooling from "../../../app/hooks/tooling/useTooling";
import useCreateProduct from "../../../app/hooks/product/useCreateProduct";

export default observer(function CreateProducts() {
  const { id } = useParams<{ id: string }>();
  const { data: singleTooling, isLoading: loading } = useTooling(id!);
  const createProduct = useCreateProduct();

  const [product, setProduct] = useState<Product | undefined>({
    name: "",
    isAllergen: false,
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("The name is required"),
  });

  function handleFormSubmit(product: Product) {
    let newProduct = {
      ...product,
      toolingId: id,
    };
    createProduct.mutate(newProduct);
    router.navigate(`/products/${id}`);
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
        <Typography ml={1}>Loading...</Typography>
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
        initialValues={product!}
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
