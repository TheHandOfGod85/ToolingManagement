import { Dialog } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";

export default observer(function ModalContainer() {
  const { modalStore } = useStore();
  return (
    <Dialog
      open={modalStore.modal.open}
      onClose={() => modalStore.closeModal()}
      maxWidth={"md"}
     // fullWidth
    >
      {modalStore.modal.body}
    </Dialog>
  );
});
