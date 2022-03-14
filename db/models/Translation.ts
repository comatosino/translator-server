import { model, Schema } from "mongoose";

interface Translation {
  srcLang: string;
  srcText: string;
  trgLang: string;
  trgText: string;
}

const TranslationSchema = new Schema<Translation>({
  srcLang: {
    type: String,
    required: true,
  },
  srcText: {
    type: String,
    required: true,
  },
  trgLang: {
    type: String,
    required: true,
  },
  trgText: {
    type: String,
    required: true,
  },
});

const Translation = model("Translation", TranslationSchema);
export default Translation;
