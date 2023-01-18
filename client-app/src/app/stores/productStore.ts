import { makeAutoObservable, runInAction } from "mobx";
import { DeleteProductDto, Product } from "../../models/tooling";
import agent from "../api/agent";

export default class ProductStore {
  products: Product[] = [];
  singleProduct: Product | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  loadProducts = async (id: string) => {
    try {
      const productList = await agent.Products.list(id);
      runInAction(() => {
        this.products = productList;
      });
    } catch (error) {
      console.log(error);
    }
  };

  createProduct = async (product: Product) => {
    try {
      await agent.Products.create(product);
      runInAction(() => {
        this.products.push(product);
        this.singleProduct = product;
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (productId: number) => {
    try {
      await agent.Products.delete(productId);
      runInAction(() => {
        this.products = [...this.products.filter((x) => x.id !== productId)];
      });
    } catch (error) {
      console.log(error);
    }
  };
}
