import { queryKeys } from "./../../api/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User, UserFormValues } from "../../../models/user";
import agent from "../../api/agent";
import { router } from "../../router/Routes";
import { store } from "../../stores/store";
import { toast } from "react-toastify";
import { startRefreshTokenTimer } from "./useRefreshToken";

export const login = async (creds: UserFormValues) => {
  return await agent.Account.login(creds);
};

export default function useLogin() {
  const queryClient = useQueryClient();
  return useMutation(login, {
    onSuccess: async (data: User) => {
      store.commonStore.setToken(data.token);
      startRefreshTokenTimer(data);
      store.modalStore.closeModal();
      router.navigate("toolings");
      toast.success("You are logged in", { position: "bottom-center" });
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      toast.error(error.response.data.message, { position: "bottom-right" });
      queryClient.removeQueries([queryKeys.toolings]);
    },
    onMutate: () => {
      queryClient.removeQueries([queryKeys.user]);
    },
  });
}
