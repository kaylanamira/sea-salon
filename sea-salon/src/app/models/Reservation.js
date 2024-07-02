import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const ReservationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }
}, { timestamps: true });

export const Reservation = models?.Reservation || model('Reservation', ReservationSchema);
