import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  allowed: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
});

// Ako već postoji model, koristi njega da izbjegnemo grešku kod hot-reloada
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User; // 👈 obavezno default export
