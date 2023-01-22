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

export default observer(function EditProduct() {
  const { toolingStore } = useStore();

  const { loading, editProduct, getProduct } = toolingStore;

  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | undefined>({
    id: 0,
    name: "",
    isAllergen: false,
    toolingId: "",
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("The name is required"),
  });

  useEffect(() => {
    if (id) getProduct(id).then((prodt) => setProduct(prodt));
  }, [id, getProduct]);

  function handleFormSubmit(newProduct: Product) {
    editProduct(newProduct);
    setTimeout(function () {
      router.navigate(`/products/${product!.toolingId}`);
    }, 3000);

    toast("Product edited!", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      theme: "light",
    });
  }

  return (
    <Paper sx={{ alignItems: "center", m: 3, mt: 10, height: "100%" }}>
      <Typography textAlign={"center"} variant="h4" mb={3}>
        Edit Product Form
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
                  to={`/products/${product!.toolingId}`}
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
