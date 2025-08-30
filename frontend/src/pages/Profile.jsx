import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import Avatar from '../components/Avatar';

const Profile = () => {
  const { role, id } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockProfile = {
      id: id,
      name: role === 'entrepreneur' ? 'Sarah Johnson' : 'John Smith',
      email: 'user@example.com',
      role: role,
      bio: 'Experienced professional in the industry.',
      location: 'San Francisco, CA',
      ...(role === 'entrepreneur' ? {
        startup: 'TechFlow Solutions',
        pitchSummary: 'AI-powered workflow automation platform',
        fundingNeed: '$500,000',
        industry: 'Technology'
      } : {
        company: 'Venture Capital Partners',
        investmentFocus: 'Technology, SaaS',
        investmentRange: '$100K - $2M'
      })
    };
    
    setProfile(mockProfile);
    setLoading(false);
  }, [role, id]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <div className="text-center">
              <Avatar fallback={profile.name} size="xl" className="mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
              <p className="text-sm text-gray-600 capitalize">{profile.role}</p>
              <p className="text-sm text-gray-500 mt-2">{profile.location}</p>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
            <p className="text-gray-700">{profile.bio}</p>
          </Card>

          {role === 'entrepreneur' ? (
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Startup Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Startup</label>
                  <p className="text-gray-900">{profile.startup}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Industry</label>
                  <p className="text-gray-900">{profile.industry}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Funding Need</label>
                  <p className="text-gray-900">{profile.fundingNeed}</p>
                </div>
              </div>
            </Card>
          ) : (
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Investment Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Company</label>
                  <p className="text-gray-900">{profile.company}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Investment Focus</label>
                  <p className="text-gray-900">{profile.investmentFocus}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Investment Range</label>
                  <p className="text-gray-900">{profile.investmentRange}</p>
                </div>
              </div>
            </Card>
          )}

          {user?.id !== id && (
            <Card>
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1">
                  Send Message
                </Button>
                {role === 'entrepreneur' && (
                  <Button className="flex-1">
                    Send Collaboration Request
                  </Button>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 