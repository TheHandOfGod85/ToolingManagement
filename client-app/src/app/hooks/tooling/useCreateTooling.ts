import { queryKeys } from "./../../api/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tooling } from "../../../models/tooling";
import agent from "../../api/agent";
import { toast } from "react-toastify";
import { router } from "../../router/Routes";
import { AxiosError, AxiosResponse } from "axios";

export const createTooling = async (tooling: Tooling) => {
  return await agent.Toolings.create(tooling);
};

export default function useCreateTooling() {
  const queryClient = useQueryClient();
  return useMutation(createTooling, {
    onSuccess: async (data: Tooling) => {
      await queryClient.invalidateQueries([queryKeys.toolings]);
      router.navigate("/toolings");
      toast.success("Tooling created", {
        position: "bottom-center",
      });
    },
    onError: (error: AxiosError) => {
      const { data } = error.response as AxiosResponse;
      toast.error(data, { position: "bottom-center" });
    },
  });
}
