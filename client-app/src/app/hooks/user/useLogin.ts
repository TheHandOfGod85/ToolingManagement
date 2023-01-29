import { useMutation } from "@tanstack/react-query";
import { User, UserFormValues } from "../../../models/user";
import agent from "../../api/agent";
import { router } from "../../router/Routes";
import { store } from "../../stores/store";
import { toast } from "react-toastify";

export const login = async (creds: UserFormValues) => {
  return await agent.Account.login(creds);
};

export default function useLogin() {
  return useMutation(login, {
    onSuccess: async (data: User) => {
      store.commonStore.setToken(data.token);
      store.modalStore.closeModal();
      router.navigate("toolings");
      toast.success("You are logged in", { position: "bottom-center" });
    },
  });
}
