import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { User, UserFormValues } from "../../../models/user";
import agent from "../../api/agent";
import { router } from "../../router/Routes";
import { store } from "../../stores/store";

export const register = async (creds: UserFormValues) => {
  return await agent.Account.register(creds);
};

export default function useRegister() {
  return useMutation(register, {
    onSuccess: async (data: User) => {
      router.navigate("/toolings");
      store.modalStore.closeModal();
      toast.success(`The user: ${data.displayName} was created`, {
        position: "bottom-center",
      });
    },
    onError: (error: any) => {
      toast.error(error, {
        position: "bottom-center",
      });
    },
  });
}
