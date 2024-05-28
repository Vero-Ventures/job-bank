import mongoose from 'mongoose';

const contactStat = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  sent: Boolean,
});

export default contactStat;
