import { model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

interface User {
  username: string;
  password: string;
  translations: Types.ObjectId[];
}

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  translations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Translation",
    },
  ],
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const User = model<User>("User", userSchema);
export default User;
