import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import { queryKeys } from "../../api/constants";

export const unSetMainImage = async (id: string) => {
  return await agent.Images.unSetMainImage(id);
};

export default function useUnSetMainImage() {
  const queryClient = useQueryClient();
  return useMutation(unSetMainImage, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.tooling]);
      toast.success("Main Image UnSet", { position: "bottom-center" });
    },
    onError: (error: AxiosError) => {
      const { data } = error.response as AxiosResponse;
      toast.error(data, { position: "bottom-center" });
    },
  });
}
