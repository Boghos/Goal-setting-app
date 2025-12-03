import mongoose from "mongoose";

const userShema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a name"],
    },
    email: {
      type: String,
      required: [true, "please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please add a password"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userShema);

export default User;
