import { store } from "./../stores/store";
import { UserFormValues } from "./../../models/user";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Image, Product, Tooling } from "../../models/tooling";
import { User } from "../../models/user";
import { router } from "../router/Routes";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          router.navigate("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          console.log(data);
        }
        break;
      case 401:
        router.navigate("/unauthorized");
        break;
      case 403:
        router.navigate("/forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body?: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body?: {}) =>
    axios.put<T>(url, body).then(responseBody),
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
  roles: () => requests.get<string[]>("/account/roles"),
};

const Products = {
  list: (id: string) =>
    requests.get<Product[]>(`/products/getProductsByToolingId/${id}`),
  current: (id: string) =>
    requests.get<Product>(`/products/getProductById/${id}`),
  create: (product: Product) =>
    requests.post<void>("/products/createProduct", product),
  delete: (productId: number) =>
    requests.del<void>(`/products/deleteProduct/${productId}`),
  edit: (product: Product) =>
    requests.put<void>(`/products/editProduct/${product.id}`, product),
};

const Images = {
  uploadImages: (file: Blob[], id: string) => {
    let formData = new FormData();
    formData.append("toolingId", id);
    file.forEach((file) => {
      formData.append("files", file);
    });
    return axios.post<Image[]>("images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  deleteImage: (imgId: string) => requests.del<void>(`/images/delete/${imgId}`),
  setMainImage: (imgId: string) =>
    requests.put<void>(`images/setMain/${imgId}`),
  unSetMainImage: (imgId: string) =>
    requests.put<void>(`images/unSetMain/${imgId}`),
};

const agent = {
  Toolings,
  Account,
  Products,
  Images,
};

export default agent;
