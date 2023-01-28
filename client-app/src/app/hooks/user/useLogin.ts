import { queryKeys } from "./../../api/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User, UserFormValues } from "../../../models/user";
import agent from "../../api/agent";
import { router } from "../../router/Routes";
import { store } from "../../stores/store";

export const login = async (creds: UserFormValues) => {
  const user = await agent.Account.login(creds);
  store.commonStore.setToken(user.token);
  return user;
};

export default function useLogin() {
  const queryClient = useQueryClient();
  return useMutation(login, {
    onSuccess: (data: User) => {
      queryClient.invalidateQueries([queryKeys.user]);
      store.commonStore.setToken(data.token);
      store.modalStore.closeModal();
      router.navigate("toolings");
    },
  });
}
