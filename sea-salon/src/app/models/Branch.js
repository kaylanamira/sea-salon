import mongoose from 'mongoose';
import ServiceSchema from './Service';
import Reservation from './Reservation'; 
const { Schema, model, models } = mongoose;
const TimeSchema = new Schema({
  hour: { type: String, required: true },
  minute: { type: String, required: true }
});

const BranchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  openTime: { type: TimeSchema, required: true },
  closeTime: { type: TimeSchema, required: true },
  services: { type: [ServiceSchema], default: []  } 
});
// const BranchSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   location: { type: String, required: true },
//   openTime: { type: TimeSchema, required: true },
//   closeTime: { type: TimeSchema, required: true },
//   services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service'}]
// });
BranchSchema.pre('findOneAndDelete', async function(next) {
  try {
    const branchId = this.getQuery()._id;
    await Reservation.deleteMany({ branchId });
    next();
  } catch (error) {
    next(error);
  }
});

export const Branch = models?.Branch || model('Branch', BranchSchema);
