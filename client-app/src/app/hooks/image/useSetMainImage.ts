import { queryKeys } from "./../../api/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "../../api/agent";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse } from "axios";

export const setMainImage = async (id: string) => {
  return await agent.Images.setMainImage(id);
};

export default function useSetMainImage() {
  const queryClient = useQueryClient();
  return useMutation(setMainImage, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.tooling]);
      toast.success("Main Image set", { position: "bottom-center" });
    },
    onError: (error: AxiosError) => {
      const { data } = error.response as AxiosResponse;
      toast.error(data, { position: "bottom-center" });
    },
  });
}
