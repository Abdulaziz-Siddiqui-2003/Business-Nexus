const Message = require('../models/Message');
const User = require('../models/User');

// Get messages between two users
const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;

    // Check if the other user exists
    const otherUser = await User.findById(userId);
    if (!otherUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get messages between the two users
    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: userId },
        { senderId: userId, receiverId: currentUserId }
      ]
    })
    .populate('senderId', 'name')
    .populate('receiverId', 'name')
    .sort({ timestamp: 1 });

    res.json({ messages });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Send a message
const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.user._id;

    // Check if receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    // Create new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message
    });

    await newMessage.save();

    // Populate sender and receiver details
    await newMessage.populate('senderId', 'name');
    await newMessage.populate('receiverId', 'name');

    res.status(201).json({
      message: 'Message sent successfully',
      newMessage
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getMessages,
  sendMessage
}; 