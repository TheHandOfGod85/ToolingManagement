import { router } from "./../router/Routes";
import { UserFormValues } from "../../models/user";
import { store } from "../stores/store";
import agent from "./agent";

export const login = async (creds: UserFormValues) => {
  const user = await agent.Account.login(creds);
  store.commonStore.setToken(user.token);
  return user;
};

export const logout = () => {
  store.commonStore.setToken(null);
  router.navigate("/");
};

export const getUser = async () => {
  const user = await agent.Account.current();
  return user;
};

export const register = async (creds: UserFormValues) => {
  const user = await agent.Account.register(creds);
  if (user?.role === "Admin") {
    router.navigate("/toolings");
  } else {
    router.navigate("/");
  }
  store.modalStore.closeModal();
};

export const getRoles = async () => {
  const roles = await agent.Account.roles();
  return roles;
};
