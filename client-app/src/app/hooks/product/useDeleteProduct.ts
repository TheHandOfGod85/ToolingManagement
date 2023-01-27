import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import { queryKeys } from "../../api/constants";

export const deleteProduct = async (id: number) => {
  return await agent.Products.delete(id);
};

export default function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation(deleteProduct, {
    onSuccess: async () => {
      queryClient.invalidateQueries([queryKeys.tooling]);
      toast.success("Product deleted", {
        position: "bottom-center",
      });
    },
    onError: (error: AxiosError) => {
      const { data } = error.response as AxiosResponse;
      toast.error(data, { position: "bottom-center" });
    },
  });
}
