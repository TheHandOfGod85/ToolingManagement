import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import useDeleteImage from "../../hooks/image/useDeleteImage";
import { useStore } from "../../stores/store";

interface Props {
  id: string;
}

export default function ToolingConfirmationDialog({ id }: Props) {
  const { mutate: deleteImage } = useDeleteImage();
  const { modalStore } = useStore();
  function handleDelete(id: string) {
    deleteImage(id);
    modalStore.closeModal();
  }
  return (
    <>
      <DialogTitle sx={{ fontSize: { xs: "13px", md: "40px" } }}>
        Do you really want to delete the image ?
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
