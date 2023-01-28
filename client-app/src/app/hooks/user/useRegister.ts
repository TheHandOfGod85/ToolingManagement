import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User, UserFormValues } from "../../../models/user";
import agent from "../../api/agent";
import { router } from "../../router/Routes";
import { store } from "../../stores/store";

export const register = async (creds: UserFormValues) => {
  return await agent.Account.register(creds);
};

export default function useRegister() {
  const queryClient = useQueryClient();
  return useMutation<User>(useRegister, {
    onSuccess: async (data: User) => {
      if (data?.role === "Admin") {
        router.navigate("/toolings");
      } else {
        router.navigate("/");
      }
      store.modalStore.closeModal();
    },
  });
}
