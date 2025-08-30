const Request = require('../models/Request');
const User = require('../models/User');

// Send collaboration request
const sendRequest = async (req, res) => {
  try {
    const { entrepreneurId, message } = req.body;
    const investorId = req.user._id;

    // Check if user is an investor
    if (req.user.role !== 'investor') {
      return res.status(403).json({ message: 'Only investors can send requests' });
    }

    // Check if entrepreneur exists
    const entrepreneur = await User.findById(entrepreneurId);
    if (!entrepreneur || entrepreneur.role !== 'entrepreneur') {
      return res.status(404).json({ message: 'Entrepreneur not found' });
    }

    // Check if request already exists
    const existingRequest = await Request.findOne({
      investorId,
      entrepreneurId
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Request already sent' });
    }

    // Create new request
    const request = new Request({
      investorId,
      entrepreneurId,
      message
    });

    await request.save();

    // Populate investor details
    await request.populate('investorId', 'name company investmentFocus');

    res.status(201).json({
      message: 'Request sent successfully',
      request
    });
  } catch (error) {
    console.error('Send request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's requests
const getRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const userRole = req.user.role;

    let requests;
    if (userRole === 'investor') {
      // Get requests sent by investor
      requests = await Request.find({ investorId: userId })
        .populate('entrepreneurId', 'name startup industry location')
        .sort({ createdAt: -1 });
    } else {
      // Get requests received by entrepreneur
      requests = await Request.find({ entrepreneurId: userId })
        .populate('investorId', 'name company investmentFocus location')
        .sort({ createdAt: -1 });
    }

    res.json({ requests });
  } catch (error) {
    console.error('Get requests error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update request status
const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user._id;

    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Check if user is the entrepreneur who received the request
    if (request.entrepreneurId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this request' });
    }

    // Update request status
    request.status = status;
    await request.save();

    // Populate investor details
    await request.populate('investorId', 'name company investmentFocus');

    res.json({
      message: `Request ${status} successfully`,
      request
    });
  } catch (error) {
    console.error('Update request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  sendRequest,
  getRequests,
  updateRequest
}; 