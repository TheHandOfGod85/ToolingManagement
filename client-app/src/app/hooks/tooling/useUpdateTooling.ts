import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Tooling } from "../../../models/tooling";
import agent from "../../api/agent";
import { queryKeys } from "../../api/constants";
import { router } from "../../router/Routes";

export const updateTooling = async (tooling: Tooling) => {
  return await agent.Toolings.update(tooling);
};

export default function useUpdateTooling() {
  const queryClient = useQueryClient();
  return useMutation(updateTooling, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKeys.tooling]);
      router.navigate("toolings");
      toast.success("Tooling edited", {
        position: "bottom-center",
      });
    },
    onError: (error: AxiosError) => {
      const { data } = error.response as AxiosResponse;
      toast.error(data, { position: "bottom-center" });
    },
  });
}
