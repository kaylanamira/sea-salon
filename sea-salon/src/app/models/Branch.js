import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const BranchSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  services: [{ type: Schema.Types.ObjectId, ref: 'Service' }]
}, { timestamps: true });

export const Branch = models?.Branch || model('Branch', BranchSchema);
