import axios from "axios";

export default class API {
  static translate = async (srcLang: string, trgLang: string, text: string) => {
    try {
      const url = `api/translate`;
      const body = { srcLang, trgLang, text };
      return axios.post(url, body);
    } catch (error) {
      console.log(error);
    }
  };

  static login = async (username: string, password: string) => {
    try {
      const url = `auth/login`;
      const body = { username, password };
      return axios.post(url, body);
    } catch (error) {
      console.log(error);
    }
  };

  static register = async (username: string, password: string) => {
    try {
      const url = `auth/register`;
      const body = { username, password };
      return axios.post(url, body);
    } catch (error) {
      console.log(error);
    }
  };
}
