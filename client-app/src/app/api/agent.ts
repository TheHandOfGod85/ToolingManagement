import { store } from "./../stores/store";
import { UserFormValues } from "./../../models/user";
import axios, { AxiosResponse } from "axios";
import { Tooling } from "../../models/tooling";
import { User } from "../../models/user";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Toolings = {
  list: () => requests.get<Tooling[]>("/toolings"),
  detail: (id: string) => requests.get<Tooling>(`/toolings/${id}`),
  create: (tooling: Tooling) => requests.post<void>("/toolings", tooling),
  update: (tooling: Tooling) =>
    requests.put<void>(`/toolings/${tooling.id}`, tooling),
  delete: (id: string) => requests.del<void>(`/toolings/${id}`),
};

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("/account/register", user),
};

const agent = {
  Toolings,
  Account,
};

export default agent;
