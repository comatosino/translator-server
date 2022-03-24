import { model, Model, Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";

interface User extends Document {
  username: string;
  password: string;
  translations: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>(
  {
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
  },
  { timestamps: true }
);

userSchema.pre<User>("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const User: Model<User> = model("User", userSchema);
export default User;
