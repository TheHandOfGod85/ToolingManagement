import { queryKeys } from "./../../api/constants";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../../models/user";
import agent from "../../api/agent";
import { useStore } from "../../stores/store";
import { startRefreshTokenTimer } from "./useRefreshToken";

export const getUser = async () => {
  const user = await agent.Account.current();
  return user;
};

export default function useUser() {
  const { commonStore } = useStore();
  return useQuery<User, Error>([queryKeys.user], () => getUser(), {
    enabled: commonStore.token ? true : false,
    onSuccess: (data: User) => {
      commonStore.setToken(data.token);
      startRefreshTokenTimer(data);
      commonStore.setAppLoaded();
    },
    onSettled: () => {
      commonStore.setAppLoaded();
    },
  });
}
