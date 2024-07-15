import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const ServiceSchema = new Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true }  
});
export const Service = models?.Service || model('Service', ServiceSchema);
export default ServiceSchema;
