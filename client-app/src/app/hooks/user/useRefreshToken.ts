import { useMutation } from "@tanstack/react-query";
import { User } from "../../../models/user";
import agent from "../../api/agent";
import { store } from "../../stores/store";

export const refreshToken = async () => {
  return await agent.Account.refreshToken();
};

export const startRefreshTokenTimer = (user: User) => {
  const jwtToken = JSON.parse(atob(user.token.split(".")[1]));
  const expires = new Date(jwtToken.exp * 1000);
  const timout = expires.getTime() - Date.now() - 30 * 1000;
  store.userStore.refreshTokenTimeout = setTimeout(refreshToken, timout);
};

export default function useRefreshToken() {
  return useMutation<User, Error>(refreshToken, {
    onSuccess: (data: User) => {
      store.commonStore.setToken(data.token);
      startRefreshTokenTimer(data);
    },
  });
}

