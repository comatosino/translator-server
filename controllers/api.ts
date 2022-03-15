import { RequestHandler } from "express";
import axios, { AxiosRequestConfig } from "axios";
import { Translation, User } from "../db/models";

// List of languages supprted by V2 REST Google Translate API (key required)
// https://translation.googleapis.com/language/translate/v2/languages
export const translate: RequestHandler = async (req, res) => {
  try {
    if (!req.userID) res.sendStatus(403);

    const { srcLang, trgLang, text } = req.body;
    const source = srcLang.substring(0, 2);

    let target: string;
    if (trgLang === "zh-CN" || trgLang === "zh-TW") target = trgLang;
    else target = trgLang.substring(0, 2);

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

      // response.data.data.translations gives array of objects
      // e.g. { translations: [ { translatedText: 'auf Deutsch' } ] }
      const {
        data: { translations },
      } = response.data;
      const [result] = translations;

      const modelData = {
        source: srcLang,
        sourceText: text,
        target: trgLang,
        targetText: result.translatedText,
      };

      const newTranslation = await Translation.create(modelData);

      await User.findByIdAndUpdate(req.userID, {
        $push: { translations: newTranslation._id },
      });

      return res.status(200).json(modelData);
    }
    res.status(400).json({ error: "languages are the same" });
  } catch (error) {
    console.log(error);
  }
};
