import mongoose from 'mongoose';
import ServiceSchema from './Service';
const { Schema, model, models } = mongoose;

const TimeSchema = new Schema({
  hour: { type: String, required: true },
  minute: { type: String, required: true }
});

const ReservationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  services: { type: [ServiceSchema],  default: [] } ,
  date: { type: Date, required: true },
  time: { type: TimeSchema, required: true }
}, { timestamps: true });
  
export const Reservation = models?.Reservation || model('Reservation', ReservationSchema);
