import { useState } from 'react';
import { useLocation } from 'react-router';
import { useAuth } from '../App';
import { AuthHeader } from '../components/AuthHeader';
import { User } from 'lucide-react';

type SettingsTab = 'profile' | 'security' | 'documents';

function MaintenanceModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl p-8 sm:p-16 max-w-2xl w-full flex flex-col items-center text-center gap-8 animate-[fadeInScale_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-yellow-50 border-2 border-yellow-200 flex items-center justify-center">
          <svg
            className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>

        <div className="space-y-3">
          <h3 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Under Maintenance
          </h3>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
            Document uploads are temporarily unavailable. We're working on it and will have this feature back shortly.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-2 w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-full font-medium text-lg transition-colors"
        >
          Got it
        </button>
      </div>

      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default function SettingsPage() {
  const location = useLocation();
  const { user, profilePic, setProfilePic, logout } = useAuth();

  const initialTab = (location.state as { tab?: SettingsTab })?.tab || 'profile';
  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab);

  const [displayName, setDisplayName] = useState(user?.name || '');
  const [firstName, setFirstName] = useState(user?.name || '');
  const [lastName, setLastName] = useState(user?.name || '');

  const [showPicMenu, setShowPicMenu] = useState(false);
  const [showMaintenance, setShowMaintenance] = useState(false);

  const [editingPassword, setEditingPassword] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');

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

  return (
    <div className="min-h-screen bg-[#eeede9] pt-3 sm:pt-5">
      <AuthHeader title="Settings" />

      {showMaintenance && (
        <MaintenanceModal onClose={() => setShowMaintenance(false)} />
      )}

      <div className="p-8 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64">
          <div className="bg-white rounded-3xl p-6 space-y-4 shadow-lg">
            {['profile', 'security', 'documents'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as SettingsTab)}
                className={`w-full text-left px-6 py-3 rounded-full transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-700 text-white'
                    : 'hover:bg-blue-50 text-gray-800'
                }`}
              >
                {tab === 'documents'
                  ? 'View Your Documents'
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
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

        <div className="flex-1 bg-white rounded-3xl p-6 sm:p-12 shadow-lg space-y-10">
          {activeTab === 'profile' && (
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl font-semibold border-b pb-4">
                Profile
              </h2>

              <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center lg:items-start">
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

          {activeTab === 'security' && (
            <div className="space-y-10">
              <h2 className="text-3xl sm:text-4xl font-semibold border-b pb-4">
                Security
              </h2>

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

              <button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-3 transition">
                Delete Account
              </button>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-10">
              <h2 className="text-3xl sm:text-4xl font-semibold border-b pb-4">
                Documents
              </h2>

              <div className="text-center py-12">
                <p className="text-2xl text-gray-500 mb-6">No documents</p>

                <button
                  onClick={() => setShowMaintenance(true)}
                  className="bg-blue-700 hover:bg-blue-800 text-white rounded-full px-8 py-3 transition"
                >
                  Add Documents
                </button>
              </div>
            </div>
          )}

          {showPicMenu && (
            <div
              className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
              onClick={() => setShowPicMenu(false)}
            >
              <div
                className="bg-white rounded-3xl p-8 shadow-xl w-80 flex flex-col items-center gap-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-24 h-24 rounded-full border-2 border-blue-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="8" r="4" strokeWidth="1.5" />
                      <path
                        d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </div>

                <p className="text-xl font-semibold text-gray-800">
                  Profile Photo
                </p>

                <label className="w-full cursor-pointer text-center bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full transition">
                  {profilePic ? 'Change Photo' : 'Upload Photo'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePicChange}
                  />
                </label>

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