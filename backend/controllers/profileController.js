const User = require('../models/User');

// Get user profile by ID
const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { bio, location, startup, pitchSummary, fundingNeed, industry, company, investmentFocus, investmentRange, portfolioCompanies } = req.body;
    
    const updateData = {
      bio,
      location,
      startup,
      pitchSummary,
      fundingNeed,
      industry,
      company,
      investmentFocus,
      investmentRange,
      portfolioCompanies
    };

    // Remove undefined values
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all entrepreneurs (for investors)
const getEntrepreneurs = async (req, res) => {
  try {
    const entrepreneurs = await User.find({ role: 'entrepreneur' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({ entrepreneurs });
  } catch (error) {
    console.error('Get entrepreneurs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all investors (for entrepreneurs)
const getInvestors = async (req, res) => {
  try {
    const investors = await User.find({ role: 'investor' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({ investors });
  } catch (error) {
    console.error('Get investors error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getEntrepreneurs,
  getInvestors
}; 