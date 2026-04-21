import { useState } from 'react';
import { useLocation } from 'react-router';
import { useAuth } from '../App';
import { AuthHeader } from '../components/AuthHeader';
import { User } from 'lucide-react';

type SettingsTab = 'profile' | 'security' | 'accessibility' | 'documents';

export default function SettingsPage() {
  const location = useLocation();
  const { user, fontSize, setFontSize, profilePic, setProfilePic } = useAuth();
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' >('light');
  const { logout } = useAuth();

  // Active tab from navigation state or default
  const initialTab = (location.state as { tab?: SettingsTab })?.tab || 'profile';
  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab);

  // Profile state
  const [displayName, setDisplayName] = useState(user?.name || '');
  const [firstName, setFirstName] = useState(user?.name || '');
  const [lastName, setLastName] = useState(user?.name || '');

  // Profile picture modal
  const [showPicMenu, setShowPicMenu] = useState(false);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setProfilePic(dataUrl);
      localStorage.setItem('profilePic', dataUrl);
    };
    reader.readAsDataURL(file);
    setShowPicMenu(false);
  };

  const handleRemoveProfilePic = () => {
    setProfilePic(null);
    localStorage.removeItem('profilePic');
    setShowPicMenu(false);
  };

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
      <AuthHeader title="Settings" />

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
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl font-semibold border-b pb-4">
                Profile
              </h2>

              {/* Mobile stacked / Desktop side-by-side */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center lg:items-start">

                {/* Profile Picture FIRST on mobile */}
                <div className="flex flex-col items-center gap-3 flex-shrink-0 order-1 lg:order-2">
                  <p className="text-xl sm:text-2xl lg:text-3xl text-gray-800">
                    Profile Picture
                  </p>

                  <div className="relative">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 rounded-full border-2 border-blue-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                      {profilePic ? (
                        <img
                          src={profilePic}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-gray-500" />
                      )}
                    </div>

                    {/* Edit button */}
                    <button
                      onClick={() => setShowPicMenu(true)}
                      className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center shadow-md transition"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2.414a2 2 0 01.586-1.414z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Fields SECOND on mobile */}
                <div className="flex-1 space-y-6 sm:space-y-8 w-full order-2 lg:order-1">
                  <div>
                    <label className="block text-lg sm:text-xl lg:text-2xl mb-2 text-gray-800">
                      Display Name
                    </label>

                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full bg-white border-2 border-blue-700 rounded-full px-5 sm:px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-lg sm:text-xl lg:text-2xl mb-2 text-gray-800">
                      Name
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="bg-white border-2 border-blue-700 rounded-full px-5 sm:px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="bg-white border-2 border-blue-700 rounded-full px-5 sm:px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert('Profile changes saved!')}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition text-base sm:text-lg"
              >
                Save Changes
              </button>
            </div>
          )}

          {/* ---------------- SECURITY TAB ---------------- */}
          {activeTab === 'security' && (
            <div className="space-y-10">
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
          <div className="space-y-10">
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
            <div className="space-y-10">
              <h2 className="text-4xl font-semibold border-b pb-4">Documents</h2>
              <div className="text-center py-12">
                <p className="text-2xl text-gray-500 mb-6">No documents</p>
                <button className="bg-blue-700 hover:bg-blue-800 text-white rounded-full px-8 py-3 transition">
                  Add Documents
                </button>
              </div>
            </div>
          )}

          {/* ---------------- PROFILE PICTURE MODAL ---------------- */}
          {showPicMenu && (
            <div
              className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
              onClick={() => setShowPicMenu(false)}
            >
              <div
                className="bg-white rounded-3xl p-8 shadow-xl w-80 flex flex-col items-center gap-6"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Avatar preview inside modal */}
                <div className="w-24 h-24 rounded-full border-2 border-blue-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="8" r="4" strokeWidth="1.5" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </div>

                <p className="text-xl font-semibold text-gray-800">Profile Photo</p>

                {/* Upload */}
                <label className="w-full cursor-pointer text-center bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full transition">
                  {profilePic ? 'Change Photo' : 'Upload Photo'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePicChange}
                  />
                </label>

                {/* Remove — only if photo exists */}
                {profilePic && (
                  <button
                    onClick={handleRemoveProfilePic}
                    className="w-full text-red-500 hover:text-red-700 border border-red-300 hover:bg-red-50 px-6 py-3 rounded-full transition"
                  >
                    Remove Photo
                  </button>
                )}

                <button
                  onClick={() => setShowPicMenu(false)}
                  className="text-sm text-gray-400 hover:text-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}