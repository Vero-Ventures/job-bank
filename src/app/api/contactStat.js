import mongoose from 'mongoose';
export default new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  sent: Boolean,
});
