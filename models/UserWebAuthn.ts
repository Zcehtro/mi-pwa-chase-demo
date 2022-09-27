import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    currentChallenge: { type: String, required: true },
    devices: { type: Array, default: [] },
  },
  {
    timestamps: true,
  },
);

const UserWebAuthn = mongoose.models.UserWebAuthn || model('UserWebAuthn', userSchema);

export default UserWebAuthn;
