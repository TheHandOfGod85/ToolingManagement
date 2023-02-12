import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import useDeleteTooling from "../../hooks/tooling/useDeleteTooling";
import { useStore } from "../../stores/store";

interface Props {
  id: string;
  toolingNumber: string;
}

export default function ToolingConfirmationDialog({
  id,
  toolingNumber,
}: Props) {
  const { mutate: deleteTooling } = useDeleteTooling();
  const { modalStore } = useStore();
  function handleDelete(id: string) {
    deleteTooling(id);
    modalStore.closeModal();
  }
  return (
    <>
      <DialogTitle sx={{ fontSize: { xs: "13px", md: "20px" } }}>
        Do you really want to delete tooling : {toolingNumber} ?
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
