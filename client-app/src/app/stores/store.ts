import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ImagesStore from "./imagesStore";
import ModalStore from "./modalStore";
import ProductStore from "./productStore";
import ToolingStore from "./toolingStore";
import UserStore from "./userStore";

interface Store {
  toolingStore: ToolingStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  productStore: ProductStore;
  imageStore: ImagesStore;
}

export const store: Store = {
  toolingStore: new ToolingStore(),
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  modalStore: new ModalStore(),
  productStore: new ProductStore(),
  imageStore: new ImagesStore(),
};

export const StoreContext = createContext(store);

//react custom hook
export function useStore() {
  return useContext(StoreContext);
}
