const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['entrepreneur', 'investor'],
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  // Entrepreneur specific fields
  startup: {
    type: String,
    default: ''
  },
  pitchSummary: {
    type: String,
    default: ''
  },
  fundingNeed: {
    type: String,
    default: ''
  },
  industry: {
    type: String,
    default: ''
  },
  // Investor specific fields
  company: {
    type: String,
    default: ''
  },
  investmentFocus: {
    type: String,
    default: ''
  },
  investmentRange: {
    type: String,
    default: ''
  },
  portfolioCompanies: [{
    type: String
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to get public profile (without password)
userSchema.methods.toPublicJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema); 