import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

const Chat = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherUser, setOtherUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Mock conversations
    const mockConversations = [
      { id: '1', name: 'Sarah Johnson', role: 'entrepreneur', lastMessage: 'Hi! I saw your profile...' },
      { id: '2', name: 'John Smith', role: 'investor', lastMessage: 'Great! When would be a good time...' },
    ];
    setConversations(mockConversations);

    if (userId) {
      // Mock data for the other user
      const mockOtherUser = {
        id: userId,
        name: userId === '1' ? 'Sarah Johnson' : 'John Smith',
        role: userId === '1' ? 'entrepreneur' : 'investor'
      };
      setOtherUser(mockOtherUser);

      // Mock messages
      const mockMessages = [
        {
          id: '1',
          senderId: userId,
          receiverId: user?.id,
          message: 'Hi! I saw your profile and I\'m interested in your startup.',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          sender: mockOtherUser
        },
        {
          id: '2',
          senderId: user?.id,
          receiverId: userId,
          message: 'Thank you for reaching out! I\'d love to discuss this further.',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          sender: user
        },
        {
          id: '3',
          senderId: userId,
          receiverId: user?.id,
          message: 'Great! When would be a good time for a call?',
          timestamp: new Date(Date.now() - 900000).toISOString(),
          sender: mockOtherUser
        }
      ];
      setMessages(mockMessages);
    }
    setLoading(false);
  }, [userId, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      senderId: user?.id,
      receiverId: userId,
      message: newMessage,
      timestamp: new Date().toISOString(),
      sender: user
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Mock response after 1 second
    setTimeout(() => {
      const response = {
        id: (Date.now() + 1).toString(),
        senderId: userId,
        receiverId: user?.id,
        message: 'Thanks for your message! I\'ll get back to you soon.',
        timestamp: new Date().toISOString(),
        sender: otherUser
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  // Show conversations list if no specific chat is selected
  if (!userId) {
    return (
      <div className="h-full flex flex-col">
        <Card className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
        </Card>
        
        <Card className="flex-1">
          <div className="space-y-2">
            {conversations.map((conversation) => (
              <Link
                key={conversation.id}
                to={`/chat/${conversation.id}`}
                className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Avatar fallback={conversation.name} size="md" className="mr-3" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{conversation.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{conversation.role}</p>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <Card className="mb-4">
        <div className="flex items-center space-x-3">
          <Avatar fallback={otherUser?.name} size="md" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{otherUser?.name}</h2>
            <p className="text-sm text-gray-500 capitalize">{otherUser?.role}</p>
          </div>
        </div>
      </Card>

      {/* Messages */}
      <Card className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md ${message.senderId === user?.id ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-end space-x-2 ${message.senderId === user?.id ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {message.senderId !== user?.id && (
                    <Avatar fallback={message.sender?.name} size="sm" />
                  )}
                  <div className={`px-4 py-2 rounded-lg ${
                    message.senderId === user?.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.senderId === user?.id ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 input-field"
            />
            <Button
              type="submit"
              disabled={!newMessage.trim()}
              size="sm"
            >
              <PaperAirplaneIcon className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Chat; 