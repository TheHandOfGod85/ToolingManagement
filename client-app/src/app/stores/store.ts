import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

interface Store {
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
}

export const store: Store = {
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

//react custom hook
export function useStore() {
  return useContext(StoreContext);
}
