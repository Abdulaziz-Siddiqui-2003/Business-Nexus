import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import { UserIcon, BuildingOfficeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const InvestorDashboard = () => {
  const { user } = useAuth();
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now
    const mockEntrepreneurs = [
      {
        id: '1',
        name: 'Sarah Johnson',
        startup: 'TechFlow Solutions',
        pitchSummary: 'AI-powered workflow automation platform',
        fundingNeed: '$500,000',
        industry: 'Technology',
        location: 'San Francisco, CA'
      },
      {
        id: '2',
        name: 'Michael Chen',
        startup: 'GreenEnergy Innovations',
        pitchSummary: 'Renewable energy solutions for urban environments',
        fundingNeed: '$750,000',
        industry: 'Clean Energy',
        location: 'Austin, TX'
      },
      {
        id: '3',
        name: 'Franklin',
        startup: 'Tech Limited',
        pitchSummary: 'Best IT Solutions',
        fundingNeed: '850,000',
        industry: 'Information Technology',
        location: 'Austin, TX'
      },
      {
        id: '4',
        name: 'Michael De Santa',
        startup: 'E-commerce Business',
        pitchSummary: 'Best IT Solutions',
        fundingNeed: '950,000',
        industry: 'Clean Energy',
        location: 'Austin, TX'
      },
      {
        id: '5',
        name: 'Sarah Johnson',
        startup: 'TechFlow Solutions',
        pitchSummary: 'AI-powered workflow automation platform',
        fundingNeed: '$500,000',
        industry: 'Technology',
        location: 'San Francisco, CA'
      },
      {
        id: '6',
        name: 'Sarah Johnson',
        startup: 'TechFlow Solutions',
        pitchSummary: 'AI-powered workflow automation platform',
        fundingNeed: '$500,000',
        industry: 'Technology',
        location: 'San Francisco, CA'
      }
    ];
    setEntrepreneurs(mockEntrepreneurs);
    setLoading(false);
  }, []);

  const handleSendRequest = (entrepreneurId) => {
    alert('Collaboration request sent successfully!');
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Investor Dashboard</h1>
        <p className="mt-2 text-gray-600">Discover promising entrepreneurs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {entrepreneurs.map((entrepreneur) => (
          <Card key={entrepreneur.id}>
            <div className="flex items-start space-x-4">
              <Avatar fallback={entrepreneur.name} size="lg" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {entrepreneur.name}
                </h3>
                <p className="text-sm font-medium text-gray-600">
                  {entrepreneur.startup}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {entrepreneur.pitchSummary}
                </p>
                <div className="mt-3 space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                    Seeking: {entrepreneur.fundingNeed}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                    {entrepreneur.location}
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = `/chat/${entrepreneur.id}`}
                  >
                    Message
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleSendRequest(entrepreneur.id)}
                  >
                    Send Request
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InvestorDashboard; 