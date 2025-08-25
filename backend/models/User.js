import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  consent: { type: Boolean, required: true }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
