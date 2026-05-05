import mongoose, { Schema } from "mongoose";
import { UserType } from "../../../types/user";

const UserSchema = new Schema<UserType>({
  email: {
    type: String,
    required: [true, "Please provide an Email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
