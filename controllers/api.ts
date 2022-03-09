import { RequestHandler } from "express";
import axios, { AxiosRequestConfig } from "axios";

export const translate: RequestHandler = async (req, res) => {
  if (!req.userID) res.sendStatus(403);

  try {
    const { srcLang, trgLang, text } = req.body;

    const source = srcLang.substring(0, 2);
    const target = trgLang.substring(0, 2);

    if (srcLang !== trgLang) {
      const url = `https://translation.googleapis.com/language/translate/v2`;
      const reqConfig: AxiosRequestConfig = {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        params: {
          key: `${process.env.GOOGLE_TRANSLATE_API_KEY}`,
        },
      };

      const response = await axios.post(
        url,
        {
          q: text,
          source,
          target,
        },
        reqConfig
      );

      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
