import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Product } from "../../../models/tooling";
import agent from "../../api/agent";
import { queryKeys } from "../../api/constants";

export const createProduct = async (product: Product) => {
  return await agent.Products.create(product);
};

export default function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation(createProduct, {
    onSuccess: async () => {
      queryClient.invalidateQueries([queryKeys.tooling]);
      toast.success("Product created", {
        position: "bottom-center",
      });
    },
    onError: (error: AxiosError) => {
      const { data } = error.response as AxiosResponse;
      toast.error(data, { position: "bottom-center" });
    },
  });
}
