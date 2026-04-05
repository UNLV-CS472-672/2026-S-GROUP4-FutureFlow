import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../App';
import { Logo } from '../components/Logo';

type SettingsTab = 'profile' | 'security' | 'accessibility' | 'documents';

export default function SettingsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, fontSize, setFontSize } = useAuth();
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' >('light');
  const { logout } = useAuth();

  // Active tab from navigation state or default
  const initialTab = (location.state as { tab?: SettingsTab })?.tab || 'profile';
  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab);

  // Profile state
  const [displayName, setDisplayName] = useState(user?.name || '');
  const [firstName, setFirstName] = useState(user?.name || '');
  const [lastName, setLastName] = useState(user?.name || '');
  const [miscDetails, setMiscDetails] = useState('');

  // Security state
  const [editingPassword, setEditingPassword] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300 pt-5">

      {/* Header */}
      <header className="bg-white rounded-full px-6 py-4 flex items-center justify-between mx-5 shadow-lg">
        <div className="flex items-center gap-4">
          <Logo size="medium" />
          <h1 className="text-3xl text-blue-900">User Settings</h1>
        </div>
        <nav className="flex items-center gap-8">
          <button onClick={() => navigate('/dashboard')} className="hover:underline text-blue-800">Home</button>
          <button onClick={() => navigate('/career-center')} className="hover:underline text-green-700">Career Center</button>
          <button onClick={() => navigate('/degree-center')} className="hover:underline text-blue-800">Degree Center</button>
          <button onClick={logout} className="hover:underline text-red-600">Log Out</button>
        </nav>
      </header>

      <div className="p-8 flex flex-col lg:flex-row gap-8">

        {/* Left Sidebar */}
        <div className="w-full lg:w-64">
          <div className="bg-white rounded-3xl p-6 space-y-4 shadow-lg">
            {['profile', 'security', 'accessibility', 'documents'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as SettingsTab)}
                className={`w-full text-left px-6 py-3 rounded-full transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-700 text-white'
                    : 'hover:bg-blue-50 text-gray-800'
                }`}
              >
                {tab === 'documents' ? 'View Your Documents' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
            <button
              onClick={logout}
              className="w-full text-left px-6 py-3 rounded-full hover:bg-red-50 text-red-600 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-3xl p-12 shadow-lg space-y-10">

          {/* ---------------- PROFILE TAB ---------------- */}
          {activeTab === 'profile' && (
            <div className="space-y-8 max-w-2xl">
              <h2 className="text-4xl font-semibold border-b pb-4">Profile</h2>

              <div>
                <label className="block text-2xl mb-2 text-gray-800">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-white border-2 border-blue-700 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-2xl mb-2 text-gray-800">Name</label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="bg-white border-2 border-blue-700 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="bg-white border-2 border-blue-700 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-2xl mb-2 text-gray-800">Miscellaneous Details</label>
                <textarea
                  value={miscDetails}
                  onChange={(e) => setMiscDetails(e.target.value)}
                  placeholder="Tentative details..."
                  className="w-full bg-white border-2 border-blue-700 rounded-2xl px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
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
                      className="w-full border-2 border-blue-700 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full border-2 border-blue-700 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border-2 border-blue-700 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full border-2 border-blue-700 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="Recovery Email (Optional)"
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                      className="w-full border-2 border-blue-700 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
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

            {/* Theme (clickable but non-functional) */}
            <div>
              <h3 className="text-2xl mb-4">Theme</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedTheme('light')} // only updates visual selection
                    className={`px-8 py-3 rounded-full transition ${
                      selectedTheme === 'light'
                        ? 'bg-blue-700 text-white' // highlighted when selected
                        : 'bg-gray-200 text-gray-800 border-2 border-gray-400' // unselected look
                    }`}
                  >
                    Light Mode
                  </button>
                  <button
                    onClick={() => setSelectedTheme('dark')} // only updates visual selection
                    className={`px-8 py-3 rounded-full transition ${
                      selectedTheme === 'dark'
                        ? 'bg-blue-700 text-white' // highlighted when selected
                        : 'bg-gray-200 text-gray-800 border-2 border-gray-400' // unselected look
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
                      : 'bg-white border-2 border-green-600 text-green-600 hover:bg-green-50'
                  }`}
                >
                  Smaller Font
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-8 py-3 rounded-full transition ${
                    fontSize === 'large'
                      ? 'bg-green-600 text-white'
                      : 'bg-white border-2 border-green-600 text-green-600 hover:bg-green-50'
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
              <div className="text-center py-12">
                <p className="text-2xl text-gray-500 mb-6">No documents</p>
                <button className="bg-blue-700 hover:bg-blue-800 text-white rounded-full px-8 py-3 transition">
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