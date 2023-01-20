import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ToolingStore from "./toolingStore";
import UserStore from "./userStore";

interface Store {
  toolingStore: ToolingStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
}

export const store: Store = {
  toolingStore: new ToolingStore(),
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

//react custom hook
export function useStore() {
  return useContext(StoreContext);
}
