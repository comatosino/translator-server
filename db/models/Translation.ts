import mongoose, { Schema } from "mongoose";

interface Translation {
  srcLang: string;
  srcText: string;
  trgLang: string;
  trgText: string;
}

const TranslationSchema = new Schema<Translation>({
  srcLang: {
    type: String,
  },
  srcText: {
    type: String,
  },
  trgLang: {
    type: String,
  },
  trgText: {
    type: String,
  },
});

const Translation = mongoose.model("Translation", TranslationSchema);
export default Translation;
