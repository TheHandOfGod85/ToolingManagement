import { queryKeys } from "./../../api/constants";
import { useQuery } from "@tanstack/react-query";
import agent from "../../api/agent";

export const getRoles = async () => {
  var roles = await agent.Account.roles();
  return roles;
};

export default function useGetRoles() {
  return useQuery<string[], Error>([queryKeys.roles], () => getRoles());
}
