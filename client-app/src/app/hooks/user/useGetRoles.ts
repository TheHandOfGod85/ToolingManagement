import { queryKeys } from "./../../api/constants";
import { useQuery } from "@tanstack/react-query";
import agent from "../../api/agent";

export const getRoles = async () => {
  return await agent.Account.roles();
};

export default function useGetRoles() {
  return useQuery<string[]>([queryKeys.roles], () => getRoles());
}
