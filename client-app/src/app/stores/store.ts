import { createContext, useContext } from "react";
import ToolingStore from "./toolingStore";

interface Store {
  toolingStore: ToolingStore;
}

export const store: Store = {
  toolingStore: new ToolingStore(),
};

export const StoreContext = createContext(store);

//react custom hook
export function useStore() {
  return useContext(StoreContext);
}
