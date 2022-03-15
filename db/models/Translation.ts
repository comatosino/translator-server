import { model, Schema } from "mongoose";

interface Translation {
  source: string;
  sourceText: string;
  target: string;
  targetText: string;
}

const TranslationSchema = new Schema<Translation>({
  source: {
    type: String,
    required: true,
  },
  sourceText: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  targetText: {
    type: String,
    required: true,
  },
});

const Translation = model("Translation", TranslationSchema);
export default Translation;
