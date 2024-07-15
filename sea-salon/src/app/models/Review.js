import mongoose, { Schema, model, models } from 'mongoose';

const reviewSchema = new Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const Review = models.Review || model('Review', reviewSchema);
