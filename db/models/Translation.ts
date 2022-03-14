import mongoose, { Schema } from "mongoose";

const TranslationSchema = new Schema({
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
