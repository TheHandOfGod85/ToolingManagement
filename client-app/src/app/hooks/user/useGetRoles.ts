import { queryKeys } from "./../../api/constants";
import { useQuery } from "@tanstack/react-query";
import agent from "../../api/agent";

export const getRoles = async () => {
  const roles = await agent.Account.roles();
  return roles;
};

export default function useGetRoles() {
  return useQuery([queryKeys.roles], () => getRoles());
}
