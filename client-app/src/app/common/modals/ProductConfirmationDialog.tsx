import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import useDeleteProduct from "../../hooks/product/useDeleteProduct";
import { useStore } from "../../stores/store";

interface Props {
  id: number;
  productName: string;
}

export default function ToolingConfirmationDialog({ id, productName }: Props) {
  const { mutate: deleteProduct } = useDeleteProduct();
  const { modalStore } = useStore();
  function handleDelete(id: number) {
    deleteProduct(id);
    modalStore.closeModal();
  }
  return (
    <>
      <DialogTitle sx={{ fontSize: { xs: "13px", md: "40px" } }}>
        Do you really want to delete product : {productName} ?
      </DialogTitle>
      <DialogContent>
        <Typography></Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color="inherit"
          variant="contained"
          size="small"
          onClick={() => modalStore.closeModal()}
        >
          No
        </Button>
        <Button
          color="warning"
          variant="contained"
          size="small"
          onClick={() => handleDelete(id)}
        >
          Yes
        </Button>
      </DialogActions>
    </>
  );
}
