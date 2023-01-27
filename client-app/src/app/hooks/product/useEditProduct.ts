import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Product } from "../../../models/tooling";
import agent from "../../api/agent";
import { queryKeys } from "../../api/constants";

export const editProduct = async (product: Product) => {
  return await agent.Products.edit(product);
};

export default function useEditProduct() {
  const queryClient = useQueryClient();
  return useMutation(editProduct, {
    onSuccess: async () => {
      queryClient.invalidateQueries([queryKeys.tooling]);
      toast.success("Product edited", {
        position: "bottom-center",
      });
    },
    onError: (error: AxiosError) => {
      const { data } = error.response as AxiosResponse;
      toast.error(data, { position: "bottom-center" });
    },
  });
}
