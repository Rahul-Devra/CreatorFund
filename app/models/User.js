import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  profilepic: { type: String, default: "" },
  coverpic: { type: String, default: "" },
  razorpayid: { type: String},
  razorpaysecret: { type: String},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || model("User", UserSchema);

export default User;

