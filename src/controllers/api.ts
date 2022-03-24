import { RequestHandler } from "express";
import axios, { AxiosRequestConfig } from "axios";
import { Translation, User } from "../db/models";

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
          format: "text",
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

      const newTranslation = await Translation.create({
        source: srcLang,
        sourceText: text,
        target: trgLang,
        targetText: result.translatedText,
      });

      await User.findByIdAndUpdate(req.userID, {
        $push: { translations: newTranslation._id },
      });

      return res.status(200).json(newTranslation);
    }
    res.status(400).json({ error: "languages are the same" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTranslation: RequestHandler = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userID, {
      $pull: { translations: req.params.id },
    });
    await Translation.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error deleting translation" });
  }
};
