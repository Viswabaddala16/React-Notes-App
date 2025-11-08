// backend/models/Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  content: { type: String, default: '' },
  tags: [String],
  pinned: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

// Update the updatedAt before saving
noteSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
