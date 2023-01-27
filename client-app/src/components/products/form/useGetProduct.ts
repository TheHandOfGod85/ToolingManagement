import { Product } from "./../../../models/tooling";
import { useQuery } from "@tanstack/react-query";
import agent from "../../../app/api/agent";
import { queryKeys } from "../../../app/api/constants";

export const getProduct = async (id: string) => {
  const product = await agent.Products.current(id);
  return product;
};

export default function useGetProduct(id: string) {
  return useQuery<Product, Error>([queryKeys.product, id], () =>
    getProduct(id)
  );
}
