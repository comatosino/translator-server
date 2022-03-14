import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
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

UserSchema.pre("save", () => {
  console.log("USER CREATED!");
  console.log("TODO: HASH PW HERE!");
});

const User = mongoose.model("User", UserSchema);
export default User;
