import { queryKeys } from "./../../api/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import { AxiosError, AxiosResponse } from "axios";

export const deleteTooling = async (id: string) => {
  return await agent.Toolings.delete(id);
};

export default function useDeleteTooling() {
  const queryClient = useQueryClient();
  return useMutation(deleteTooling, {
    onSuccess: async () => {
      queryClient.invalidateQueries([queryKeys.toolings]);
      toast.success("Tooling deleted", {
        position: "bottom-center",
      });
    },
    onError: (error: AxiosError) => {
      const { data } = error.response as AxiosResponse;
      toast.error(data, { position: "bottom-center" });
    },
  });
}
