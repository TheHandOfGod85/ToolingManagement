import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../../models/tooling";
import * as Yup from "yup";
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
import MyTextInput from "../../toolings/form/common/MyTextInput";
import MyCheckBox from "../../toolings/form/common/MyCheckBox";
import { observer } from "mobx-react-lite";
import { router } from "../../../app/router/Routes";
import { LoadingButton } from "@mui/lab";
import useGetProduct from "../../../app/hooks/product/useGetProduct";
import useEditProduct from "../../../app/hooks/product/useEditProduct";

export default observer(function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading: loading } = useGetProduct(id!);

  const editProduct = useEditProduct();

  const [product, setProduct] = useState<Product>({
    name: "",
    isAllergen: false,
    toolingId: "",
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("The name is required"),
  });

  useEffect(() => {
    if (id) setProduct(data!);
  }, [data]);

  function handleFormSubmit(newProduct: Product) {
    editProduct.mutate(newProduct);
    router.navigate(`/products/${product?.toolingId}`);
  }

  return (
    <Stack sx={{ height: 400, mt: { xs: 8, md: 9 }, ml: 1, mr: 1 }}>
      <Paper>
        <Typography
          textAlign={"center"}
          variant="h3"
          sx={{ mt: 1, mb: 1, fontSize: { xs: "17px", md: "40px" } }}
          fontFamily={"anton"}
          color={"primary"}
        >
          Edit Product Form
        </Typography>
        <Formik
          enableReinitialize
          validationSchema={validationSchema}
          initialValues={product!}
          onSubmit={(values: Product) => handleFormSubmit(values)}
        >
          {({ isValid, isSubmitting, dirty }) => (
            <Form autoComplete="off">
              <FormGroup row sx={{ mb: 2, justifyContent: "space-evenly" }}>
                <MyTextInput
                  InputProps={{
                    endAdornment: loading && <CircularProgress size={18} />,
                  }}
                  name="name"
                  placeholder="Product Name"
                />
                <MyCheckBox
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
                    to={`/products/${product?.toolingId}`}
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
});
