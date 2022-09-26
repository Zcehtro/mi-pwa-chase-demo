import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
    currentChallenge: { type: String },
    devices: { type: Array, default: [] },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
