import "dotenv/config";
import { RequestHandler } from "express";
import axios, { AxiosRequestConfig } from "axios";

export const translate: RequestHandler = async (req, res) => {
  const { srcLang, trgLang, text } = req.body;

  const source = srcLang.substring(0, 2);
  const target = trgLang.substring(0, 2);

  console.log(source);
  console.log(target);
  console.log(text);

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

    return await axios.post(
      url,
      {
        q: text,
        source,
        target,
      },
      reqConfig
    );
  }
};
