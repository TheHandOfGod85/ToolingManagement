import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Product, Tooling } from "../../models/tooling";
import { v4 as uuid } from "uuid";
import { ToastContainer, toast } from "react-toastify";

export default class ToolingStore {
  toolings: Tooling[] = [];
  singleTooling: Tooling = {
    id: "",
    tNumber: "",
    psNumber: "",
    quantity: 0,
    department: "",
    note: "",
    isInProduction: false,
    numberOfImpressions: 0,
    image: "",
    punnetNumber: "",
    images: ([] = []),
    products: ([] = []),
  };
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadToolings = async () => {
    this.loading = true;
    try {
      const toolingList = await agent.Toolings.list();
      runInAction(() => {
        this.toolings = toolingList;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  loadTooling = async (id: string) => {
    this.loading = true;
    try {
      let single = await agent.Toolings.detail(id);
      runInAction(() => {
        this.singleTooling = single!;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteTooling = async (id: string) => {
    this.loading = true;
    try {
      await agent.Toolings.delete(id);
      runInAction(() => {
        this.toolings = [...this.toolings.filter((x) => x.id !== id)];
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  createTooling = async (tooling: Tooling) => {
    this.loading = true;
    tooling.id = uuid();
    try {
      await agent.Toolings.create(tooling);
      runInAction(() => {
        this.toolings.push(tooling);
        this.singleTooling = tooling;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateTooling = async (tooling: Tooling) => {
    this.loading = true;
    try {
      await agent.Toolings.update(tooling);
      runInAction(() => {
        this.toolings = [
          ...this.toolings.filter((a) => a.id !== tooling.id),
          tooling,
        ];
        this.singleTooling = tooling;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  createProduct = async (product: Product) => {
    try {
      await agent.Products.create(product);
      runInAction(() => {
        this.singleTooling.products?.push(product);
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (productId: number) => {
    try {
      await agent.Products.delete(productId);
      runInAction(() => {
        this.singleTooling.products?.filter((x) => x.id !== productId);
      });
    } catch (error) {
      console.log(error);
    }
  };
}
