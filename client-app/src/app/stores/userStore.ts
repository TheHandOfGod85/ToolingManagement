import { router } from "./../router/Routes";
import { UserFormValues } from "./../../models/user";
import { makeAutoObservable, runInAction } from "mobx";
import { User } from "../../models/user";
import agent from "../api/agent";
import { store } from "./store";

export default class UserStore {
  user: User | null = null;
  userRoles: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => {
        this.user = user;
        router.navigate("toolings");
        store.modalStore.closeModal();
      });
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate("/");
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => {
        this.user = user;
      });
      return this.user;
    } catch (error) {
      console.log(error);
    }
  };

  register = async (creds: UserFormValues) => {
    try {
      var user = await agent.Account.register(creds);
      runInAction(() => {
        if (this.user?.role === "Admin") {
          router.navigate("/toolings");
        } else {
          this.user = user;
          router.navigate("/");
        }

        store.modalStore.closeModal();
      });
    } catch (error) {
      throw error;
    }
  };

  getRoles = async () => {
    try {
      const roles = await agent.Account.roles();
      runInAction(() => {
        this.userRoles = roles;
      });
    } catch (error) {
      throw error;
    }
  };
}
