import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please enter a valid email"],
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

export const Subscriber = mongoose.model("Subscriber", subscriberSchema);
