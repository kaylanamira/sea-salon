import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const UserSchema = new Schema({
  fullname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { 
    type: String, 
    required: true, 
    validate: {
      validator: pass => pass?.length >= 8,
      message: 'Password must be at least 8 characters'
    }
  }
}, { timestamps: true });

export const User = models?.User || model('User', UserSchema);
