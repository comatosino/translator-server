import { model, Schema, Types } from "mongoose";

interface User {
  username: string;
  password: string;
  translations: Types.ObjectId[];
}

const userSchema = new Schema<User>({
  username: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  translations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Translation",
    },
  ],
});

const User = model<User>("User", userSchema);
export default User;
