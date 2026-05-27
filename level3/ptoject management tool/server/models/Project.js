const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  startDate: { type: Date, default: Date.now },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ['Not Started', 'In Progress', 'Complete'], default: 'Not Started' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', ProjectSchema);
