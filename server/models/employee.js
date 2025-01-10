const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  id:Number,
  name: String,
  email: String,
  position: String,
  department: String,
  dateOfJoining: Date,
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  profilePicture: String, // URL of uploaded picture
  auditLog: [
    {
      change: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Employee', employeeSchema);
