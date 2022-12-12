import axios, { AxiosResponse } from "axios";
import { Tooling } from "../../models/tooling";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

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

const agent = {
  Toolings,
};

export default agent;
