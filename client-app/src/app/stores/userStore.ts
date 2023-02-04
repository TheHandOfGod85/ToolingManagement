import { router } from "./../router/Routes";
import { makeAutoObservable } from "mobx";
import { store } from "./store";

export default class UserStore {
  refreshTokenTimeout: any;
  constructor() {
    makeAutoObservable(this);
  }

  logout = () => {
    store.commonStore.setToken(null);
    router.navigate("/");
  };

  stopRefreshTokenTimer = () => {
    clearTimeout(this.refreshTokenTimeout);
  };
}
