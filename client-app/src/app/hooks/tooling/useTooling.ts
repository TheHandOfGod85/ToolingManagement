import { toast } from "react-toastify";
import { queryKeys } from "./../../api/constants";
import agent from "../../api/agent";
import { useQuery } from "@tanstack/react-query";
import { Tooling } from "../../../models/tooling";
import { AxiosError, AxiosResponse } from "axios";

export const getTooling = async (id: string) => {
  const tooling = await agent.Toolings.detail(id);
  return tooling;
};

export default function useTooling(id: string) {
  return useQuery<Tooling, Error>(
    [queryKeys.tooling, id],
    () => getTooling(id),
    { enabled: id ? true : false }
  );
}
