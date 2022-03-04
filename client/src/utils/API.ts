import axios from "axios";

export default class API {
  static translate = (srcLang: string, trgLang: string, text: string) => {
    const url = `/api/translate`;
    const body = { srcLang, trgLang, text };
    return axios.post(url, body);
  };

  static signup = () => {
    const url = `/auth/signup`;
    return axios.post(url);
  };

  static signin = () => {
    const url = `/auth/signin`;
    return axios.post(url);
  };

  static signout = () => {
    const url = `/auth/signout`;
    return axios.post(url);
  };
}
