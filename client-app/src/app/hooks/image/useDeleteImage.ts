import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import { queryKeys } from "../../api/constants";

export const deleteImage = async (id: string) => {
  return await agent.Images.deleteImage(id);
};

export default function useDeleteImage() {
  const queryClient = useQueryClient();

  return useMutation(deleteImage, {
    onSuccess: async () => {
      queryClient.invalidateQueries([queryKeys.tooling]);
      toast.success("Image deleted", {
        position: "bottom-center",
      });
    },
    onError: (error: AxiosError) => {
      const { data } = error.response as AxiosResponse;
      toast.error(data, { position: "bottom-center" });
    },
  });
}
