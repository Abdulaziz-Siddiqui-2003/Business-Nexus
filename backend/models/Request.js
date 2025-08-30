const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  investorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  entrepreneurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  message: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Ensure unique combination of investor and entrepreneur
requestSchema.index({ investorId: 1, entrepreneurId: 1 }, { unique: true });

module.exports = mongoose.model('Request', requestSchema); 