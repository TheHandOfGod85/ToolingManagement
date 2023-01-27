import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { ImageUpload } from "../../../models/tooling";
import agent from "../../api/agent";
import { queryKeys } from "../../api/constants";

export const uploadImages = async ({ files, id }: ImageUpload) => {
  await agent.Images.uploadImages(files, id!);
};

export default function useUploadImages() {
  const queryClient = useQueryClient();
  return useMutation(uploadImages, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.tooling]);
      toast.success("Images uploaded", { position: "bottom-center" });
    },
    onError: (error: AxiosError) => {
      const { data } = error.response as AxiosResponse;
      toast.error(data, { position: "bottom-center" });
    },
  });
}
