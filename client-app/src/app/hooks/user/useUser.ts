import { queryKeys } from "./../../api/constants";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../../models/user";
import agent from "../../api/agent";

export const getUser = async () => {
  const user = await agent.Account.current();
  return user;
};

export default function useUser() {
  return useQuery<User, Error>([queryKeys.user], () => getUser());
}
