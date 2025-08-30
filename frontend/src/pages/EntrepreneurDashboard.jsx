import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import Avatar from '../components/Avatar';

const EntrepreneurDashboard = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockRequests = [
      {
        id: '1',
        investor: {
          name: 'John Smith',
          company: 'Venture Capital Partners',
          location: 'New York, NY'
        },
        status: 'pending',
        message: 'Interested in your AI platform.'
      },
      {
        id: '2',
        investor: {
          name: 'Lisa Wang',
          company: 'Innovation Fund',
          location: 'San Francisco, CA'
        },
        status: 'pending',
        message: 'Interested in your AI platform.'
      },
      {
        id: '3',
        investor: {
          name: 'Tyler',
          company: 'Innovation Fund',
          location: 'San Francisco, CA'
        },
        status: 'pending',
        message: 'Interested in your AI platform.'
      },
      {
        id: '4',
        investor: {
          name: 'Trevor',
          company: 'Innovation Fund',
          location: 'San Francisco, CA'
        },
        status: 'pending',
        message: 'Interested in your AI platform.'
      },
      {
        id: '5',
        investor: {
          name: 'Lisa Wang',
          company: 'Innovation Fund',
          location: 'San Francisco, CA'
        },
        status: 'pending',
        message: 'Interested in your AI platform.'
      },
      {
        id: '6',
        investor: {
          name: 'Tyler',
          company: 'Innovation Fund',
          location: 'San Francisco, CA'
        },
        status: 'pending',
        message: 'Interested in your AI platform.'
      }
    ];
    setRequests(mockRequests);
    setLoading(false);
  }, []);

  const handleRequestAction = (requestId, action) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: action }
          : req
      )
    );
    alert(`Request ${action} successfully!`);
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Entrepreneur Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage your collaboration requests</p>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id}>
            <div className="flex items-start space-x-4">
              <Avatar fallback={request.investor.name} size="lg" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {request.investor.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-600">
                      {request.investor.company}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    request.status === 'accepted' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.status}
                  </span>
                </div>
                
                <p className="text-sm text-gray-500 mt-2">
                  {request.investor.location}
                </p>
                
                <p className="text-sm text-gray-700 mt-3 p-3 bg-gray-50 rounded-lg">
                  {request.message}
                </p>
                
                {request.status === 'pending' && (
                  <div className="mt-4 flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleRequestAction(request.id, 'accepted')}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRequestAction(request.id, 'rejected')}
                    >
                      Decline
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EntrepreneurDashboard; 