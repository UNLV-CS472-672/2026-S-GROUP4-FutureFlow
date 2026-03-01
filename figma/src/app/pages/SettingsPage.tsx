import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../App';
import { Logo } from '../components/Logo';

type SettingsTab = 'profile' | 'security' | 'accessibility' | 'documents';
type Theme = 'light' | 'dark';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user, logout, fontSize, setFontSize } = useAuth();

  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  // Profile state
  const [displayName, setDisplayName] = useState(user?.firstName || '');
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [miscDetails, setMiscDetails] = useState('');

  // Security state
  const [editingPassword, setEditingPassword] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');

  // Theme state (persistent)
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 rounded-full px-6 py-4 flex items-center justify-between mx-5 mt-5 shadow-lg">
        <div className="flex items-center gap-4">
          <Logo size="medium" />
          <h1 className="text-3xl text-blue-900 dark:text-gray-200">User Settings</h1>
        </div>
        <nav className="flex items-center gap-8">
          <button onClick={() => navigate('/dashboard')} className="hover:underline text-blue-800 dark:text-blue-300">Home</button>
          <button onClick={() => navigate('/career-center')} className="hover:underline text-green-700 dark:text-green-400">Career Center</button>
          <button onClick={() => navigate('/degree-center')} className="hover:underline text-blue-800 dark:text-blue-300">Degree Center</button>
          <button onClick={handleLogout} className="hover:underline text-red-600 dark:text-red-400">Log Out</button>
        </nav>
      </header>

      <div className="p-8 flex flex-col lg:flex-row gap-8">

        {/* Left Sidebar */}
        <div className="w-full lg:w-64">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 space-y-4 shadow-lg">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-6 py-3 rounded-full transition-colors ${activeTab === 'profile' ? 'bg-blue-700 text-white' : 'hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full text-left px-6 py-3 rounded-full transition-colors ${activeTab === 'security' ? 'bg-blue-700 text-white' : 'hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('accessibility')}
              className={`w-full text-left px-6 py-3 rounded-full transition-colors ${activeTab === 'accessibility' ? 'bg-blue-700 text-white' : 'hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              Accessibility
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`w-full text-left px-6 py-3 rounded-full transition-colors ${activeTab === 'documents' ? 'bg-blue-700 text-white' : 'hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              View Your Documents
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-6 py-3 rounded-full hover:bg-red-50 dark:hover:bg-red-700 text-red-600 dark:text-red-400 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-lg space-y-10">

          {/* ---------------- PROFILE TAB ---------------- */}
          {activeTab === 'profile' && (
            <div className="space-y-8 max-w-2xl">

              <h2 className="text-4xl font-semibold border-b pb-4">Profile</h2>

              <div>
                <label className="block text-2xl mb-2 text-gray-800 dark:text-gray-200">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-white dark:bg-gray-700 border-2 border-blue-700 dark:border-blue-400 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-2xl mb-2 text-gray-800 dark:text-gray-200">Name</label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="bg-white dark:bg-gray-700 border-2 border-blue-700 dark:border-blue-400 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="bg-white dark:bg-gray-700 border-2 border-blue-700 dark:border-blue-400 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-2xl mb-2 text-gray-800 dark:text-gray-200">Miscellaneous Details</label>
                <textarea
                  value={miscDetails}
                  onChange={(e) => setMiscDetails(e.target.value)}
                  placeholder="Tentative details..."
                  className="w-full bg-white dark:bg-gray-700 border-2 border-blue-700 dark:border-blue-400 rounded-2xl px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
                />
              </div>

              <button
                onClick={() => alert('Profile changes saved!')}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition text-lg"
              >
                Save Profile
              </button>

            </div>
          )}

          {/* ---------------- SECURITY TAB ---------------- */}
          {activeTab === 'security' && (
            <div className="space-y-10 max-w-2xl">

              <h2 className="text-4xl font-semibold border-b pb-4">Security</h2>

              {/* Change Password */}
              <div className="space-y-4">
                <button
                  onClick={() => setEditingPassword(!editingPassword)}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-full px-6 py-3 transition"
                >
                  {editingPassword ? 'Cancel Password Change' : 'Change Password'}
                </button>

                {editingPassword && (
                  <div className="space-y-4 pt-4">
                    <input
                      type="password"
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full border-2 border-blue-700 dark:border-blue-400 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full border-2 border-blue-700 dark:border-blue-400 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border-2 border-blue-700 dark:border-blue-400 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => {
                        if (newPassword !== confirmPassword) {
                          alert('Passwords do not match!');
                          return;
                        }
                        alert('Password updated!');
                        setEditingPassword(false);
                        setCurrentPassword('');
                        setNewPassword('');
                        setConfirmPassword('');
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-3 transition"
                    >
                      Confirm Password Change
                    </button>
                  </div>
                )}
              </div>

              {/* Change Email */}
              <div className="space-y-4">
                <button
                  onClick={() => setEditingEmail(!editingEmail)}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-full px-6 py-3 transition"
                >
                  {editingEmail ? 'Cancel Email Change' : 'Change Email'}
                </button>

                {editingEmail && (
                  <div className="space-y-4 pt-4">
                    <input
                      type="email"
                      placeholder="New Email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full border-2 border-blue-700 dark:border-blue-400 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="Recovery Email (Optional)"
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                      className="w-full border-2 border-blue-700 dark:border-blue-400 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => {
                        alert('Email updated!');
                        setEditingEmail(false);
                        setNewEmail('');
                        setRecoveryEmail('');
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-3 transition"
                    >
                      Confirm Email Change
                    </button>
                  </div>
                )}
              </div>

              {/* Delete Account */}
              <div>
                <button
                  className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-3 transition"
                >
                  Delete Account
                </button>
              </div>

            </div>
          )}

          {/* ---------------- ACCESSIBILITY TAB ---------------- */}
          {activeTab === 'accessibility' && (
            <div className="space-y-10 max-w-2xl">

              <h2 className="text-4xl font-semibold border-b pb-4">Accessibility</h2>

              {/* Theme */}
              <div>
                <h3 className="text-2xl mb-4">Theme</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => setTheme('light')}
                    className={`px-8 py-3 rounded-full transition ${
                      theme === 'light'
                        ? 'bg-blue-700 text-white'
                        : 'border-2 border-blue-700 text-blue-700 dark:border-blue-300 dark:text-blue-300'
                    }`}
                  >
                    Light Mode
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`px-8 py-3 rounded-full transition ${
                      theme === 'dark'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }`}
                  >
                    Dark Mode
                  </button>
                </div>
              </div>

              {/* Text Size */}
              <div>
                <h3 className="text-2xl mb-4">Text Size</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => setFontSize('small')}
                    className={`px-8 py-3 rounded-full transition ${
                      fontSize === 'small'
                        ? 'bg-green-600 text-white'
                        : 'bg-white dark:bg-gray-700 border-2 border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    Smaller Font
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`px-8 py-3 rounded-full transition ${
                      fontSize === 'large'
                        ? 'bg-green-600 text-white'
                        : 'bg-white dark:bg-gray-700 border-2 border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    Bigger Font
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ---------------- DOCUMENTS TAB ---------------- */}
          {activeTab === 'documents' && (
            <div className="space-y-10 max-w-2xl">

              <h2 className="text-4xl font-semibold border-b pb-4">Documents</h2>

              {/* No Documents Message */}
              <div className="text-center py-12">
                <p className="text-2xl text-gray-500 dark:text-gray-400 mb-6">No documents</p>
                <button
                  className="bg-blue-700 hover:bg-blue-800 text-white rounded-full px-8 py-3 transition"
                >
                  Add Documents
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}