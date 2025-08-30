import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Avatar from '../components/Avatar';
import { 
  HomeIcon, 
  UserIcon, 
  ChatBubbleLeftRightIcon, 
  BellIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: `/dashboard/${user?.role}`,
      icon: HomeIcon,
      current: location.pathname === `/dashboard/${user?.role}`
    },
    {
      name: 'Profile',
      href: `/profile/${user?.role}/${user?.id}`,
      icon: UserIcon,
      current: location.pathname.includes('/profile')
    },
    {
      name: 'Chat',
      href: '/chat',
      icon: ChatBubbleLeftRightIcon,
      current: location.pathname.includes('/chat')
    }
  ];

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Business Nexus
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              item.current
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <Avatar fallback={user?.name} size="sm" className="mr-3" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.role}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="ml-2 p-1 text-gray-400 hover:text-gray-600"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <Sidebar />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <Sidebar />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                {navigation.find(item => item.current)?.name || 'Dashboard'}
              </h1>
            </div>
            
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <BellIcon className="h-6 w-6" />
              </button>
              
              <div className="flex items-center">
                <Avatar fallback={user?.name} size="sm" />
                <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                  {user?.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 