import axios, { AxiosRequestHeaders } from "axios";
import { UserProfile } from "../store/userSlice";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("translator-token");
    if (token) {
      const headers: AxiosRequestHeaders = {
        authorization: `Bearer ${token}`,
      };
      config["headers"] = headers;
    }
    return config;
  },
  (error) => console.error(error)
);

export type Credentials = {
  username: string;
  password: string;
};

export type AppApiGetUserResponse = {
  profile: UserProfile;
};

export type AppApiAuthResponse = {
  token: "string";
  profile: UserProfile;
};

export default class API {
  static getUser = async () => {
    const url = `auth/user`;
    return axios.get<AppApiGetUserResponse>(url);
  };

  static register = async (credentials: Credentials) => {
    const url = `auth/register`;
    return axios.post<AppApiAuthResponse>(url, credentials);
  };

  static login = async (credentials: Credentials) => {
    const url = `auth/login`;
    return axios.post<AppApiAuthResponse>(url, credentials);
  };

  static logout = async () => {
    console.log("API LOGOUT");
    const url = `auth/logout`;
    return axios.delete(url);
  };
}
