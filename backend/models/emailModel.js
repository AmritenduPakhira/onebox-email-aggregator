import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  from: { type: String, required: true },
  subject: { type: String, required: true },
  date: { type: Date, required: true },
  body: { type: String }, // Ensure it's a string to store plain or HTML text
}, {
  timestamps: true,
});

const Email = mongoose.model('Email', emailSchema);

export default Email;
