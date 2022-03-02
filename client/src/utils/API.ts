import axios, { AxiosRequestConfig } from "axios";

export default class API {
  static translate = (srcLang: string, trgLang: string, text: string) => {
    if (srcLang !== trgLang) {
      const url = `https://translation.googleapis.com/language/translate/v2`;
      const reqConfig: AxiosRequestConfig = {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        params: {
          key: `${process.env.GOOGLE_MAPS_API_KEY}`,
        },
      };

      return axios.post(
        url,
        {
          q: text,
          source: srcLang.substring(0, 2),
          target: trgLang.substring(0, 2),
        },
        reqConfig
      );
    }
  };
}
