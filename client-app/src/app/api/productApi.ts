import { Product } from "./../../models/tooling";
import agent from "./agent";

export const getProduct = async (id: string) => {
  const product = await agent.Products.current(id);
  return product;
};

export const createProduct = async (product: Product) => {
  return await agent.Products.create(product);
};

export const deleteProduct = async (id: number) => {
  return await agent.Products.delete(id);
};

export const editProduct = async (product: Product) => {
  return await agent.Products.edit(product);
};
