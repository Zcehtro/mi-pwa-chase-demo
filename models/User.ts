import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    currentChallenge: { type: String, required: true },
    devices: { type: Array, default: [] },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || model('User', userSchema);

export default User;
