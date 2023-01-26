import agent from "../../api/agent";
import { useQuery, QueryCache } from "@tanstack/react-query";

const queryCache = QueryCache;

export const getTooling = async (id: string) => {
  const tooling = await agent.Toolings.detail(id);
  return tooling;
};

export default function useTooling(id: string) {
  return useQuery(["tooling", id], () => getTooling(id), {});
}
