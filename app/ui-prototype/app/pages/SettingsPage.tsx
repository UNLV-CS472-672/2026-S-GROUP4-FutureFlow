import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../App';
import { Logo } from '../components/Logo';

type SettingsTab = 'profile' | 'security' | 'accessibility' | 'logout';
type Theme = 'light' | 'dark';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user, logout, fontSize, setFontSize } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [displayName, setDisplayName] = useState(user?.firstName || '');
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [address, setAddress] = useState('');
  const [theme, setTheme] = useState<Theme>('light');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white rounded-full px-6 py-4 flex items-center justify-between mx-5 mt-5 shadow-lg">
        <div className="flex items-center gap-4">
          <Logo size="medium" />
          <h1 className="text-3xl text-blue-900">User Settings</h1>
        </div>
        <nav className="flex items-center gap-8">
          <button onClick={() => navigate('/dashboard')} className="hover:underline text-blue-800">
            Home
          </button>
          <button onClick={() => navigate('/career-center')} className="hover:underline text-green-700">
            Career Center
          </button>
          <button onClick={() => navigate('/degree-center')} className="hover:underline text-blue-800">
            Degree Center
          </button>
          <button onClick={handleLogout} className="hover:underline text-red-600">
            Log Out
          </button>
        </nav>
      </header>

      <div className="p-8 flex gap-8">
        {/* Left Sidebar */}
        <div className="w-64">
          <div className="bg-white rounded-3xl p-6 space-y-4 shadow-lg">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-6 py-3 rounded-full transition-colors ${
                activeTab === 'profile' ? 'bg-blue-700 text-white' : 'hover:bg-blue-50 text-gray-800'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full text-left px-6 py-3 rounded-full transition-colors ${
                activeTab === 'security' ? 'bg-blue-700 text-white' : 'hover:bg-blue-50 text-gray-800'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('accessibility')}
              className={`w-full text-left px-6 py-3 rounded-full transition-colors ${
                activeTab === 'accessibility' ? 'bg-blue-700 text-white' : 'hover:bg-blue-50 text-gray-800'
              }`}
            >
              Accessibility
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-6 py-3 rounded-full hover:bg-red-50 text-red-600 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-3xl p-12 shadow-lg">
          {activeTab === 'profile' && (
            <div>
              <div className="flex items-center gap-6 mb-12">
                <div className="w-24 h-24 rounded-full bg-blue-700 flex items-center justify-center text-white">
                  &lt;profile photo&gt;
                </div>
                <div className="space-x-4">
                  <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full transition-colors">
                    Change Profile Picture
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-colors">
                    Remove Profile Picture
                  </button>
                </div>
              </div>

              <div className="space-y-8 max-w-2xl">
                <div>
                  <label className="block text-2xl mb-3 text-gray-800">Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="&lt;Editable text box&gt;"
                    className="w-full bg-white border-2 border-blue-700 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-2xl mb-3 text-gray-800">Name</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="&lt;First Name Editable Text Box&gt;"
                      className="bg-white border-2 border-blue-700 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="&lt;Last Name Editable Text box&gt;"
                      className="bg-white border-2 border-blue-700 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-2xl mb-3 text-gray-800">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="&lt;Text box&gt;"
                    className="w-full bg-white border-2 border-blue-700 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <div className="flex items-center gap-6 mb-12">
                <div className="w-24 h-24 rounded-full bg-blue-700 flex items-center justify-center text-white">
                  &lt;profile photo&gt;
                </div>
                <h2 className="text-4xl text-gray-800">Security</h2>
              </div>

              <div className="space-y-8 max-w-2xl">
                <div>
                  <label className="block text-2xl mb-3 text-gray-800">Password</label>
                  <button className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-full px-6 py-3 transition-colors">
                    &lt;"Change Password" button&gt;
                  </button>
                </div>

                <div>
                  <label className="block text-2xl mb-3 text-gray-800">Email</label>
                  <button className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-full px-6 py-3 mb-3 transition-colors">
                    &lt;"Change Email" button&gt;
                  </button>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-3 transition-colors">
                    &lt;"Add Recovery Email" button&gt;
                  </button>
                </div>

                <div>
                  <label className="block text-2xl mb-3 text-gray-800">Delete Account</label>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-3 transition-colors">
                    &lt;"Delete Account" button&gt;
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'accessibility' && (
            <div>
              <div className="flex items-center gap-6 mb-12">
                <div className="w-24 h-24 rounded-full bg-blue-700 flex items-center justify-center text-white text-sm">
                  &lt;profile photo&gt;
                </div>
                <h2 className="text-4xl text-gray-800">Accessibility</h2>
              </div>

              <div className="space-y-12 max-w-2xl">
                {/* Theme Section */}
                <div>
                  <h3 className="text-3xl mb-3 text-gray-800">Theme</h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Change how FutureFlow looks on your screen.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setTheme('light')}
                      className={`px-8 py-3 rounded-full transition-colors ${
                        theme === 'light'
                          ? 'bg-blue-700 text-white'
                          : 'bg-white border-2 border-blue-700 text-blue-700 hover:bg-blue-50'
                      }`}
                    >
                      &lt;LIGHT Mode Button&gt;
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`px-8 py-3 rounded-full transition-colors ${
                        theme === 'dark'
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      &lt;DARK Mode Button&gt;
                    </button>
                  </div>
                </div>

                {/* Text Size Section */}
                <div>
                  <h3 className="text-3xl mb-6 text-gray-800">Text</h3>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setFontSize('small')}
                      className={`px-8 py-3 rounded-full transition-colors ${
                        fontSize === 'small'
                          ? 'bg-green-600 text-white'
                          : 'bg-white border-2 border-green-600 text-green-600 hover:bg-green-50'
                      }`}
                    >
                      &lt;"SMALLER FONT" button&gt;
                    </button>
                    <button
                      onClick={() => setFontSize('large')}
                      className={`px-8 py-3 rounded-full transition-colors ${
                        fontSize === 'large'
                          ? 'bg-green-600 text-white'
                          : 'bg-white border-2 border-green-600 text-green-600 hover:bg-green-50'
                      }`}
                    >
                      &lt;"BIGGER FONT" button&gt;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}