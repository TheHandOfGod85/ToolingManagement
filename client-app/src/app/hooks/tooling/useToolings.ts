import { queryKeys } from "./../../api/constants";
import { useQuery } from "@tanstack/react-query";
import agent from "../../api/agent";
import { Tooling } from "../../../models/tooling";
import { toast } from "react-toastify";

export const getToolings = async () => {
  const toolings = await agent.Toolings.list();
  return toolings;
};

export default function useToolings() {
  return useQuery<Tooling[], Error>(
    [queryKeys.toolings],
    () => getToolings(),
    {
      onError: (error) => {
        let title =
          error instanceof Error ? error.message : "Problem with server";
        toast.error(title, { position: "bottom-center" });
      },
    }
  );
}
