import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const { Schema, model, models } = mongoose;

const UserSchema = new Schema({
  fullname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'customer' }
}, { timestamps: true });

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);
  next();
});

export const User = models?.User || model('User', UserSchema);
