import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const tabs = ['Profile', 'Orders', 'Addresses', 'Settings'];

const statusColors = {
  Delivered: 'bg-green-100 text-green-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Processing: 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
};

export default function UserProfile() {
  const { user, isLoggedIn, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('Profile');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary to-gray-700 text-white rounded-2xl p-6 mb-8 flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-black flex-shrink-0">
          {user.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-300 text-sm">{user.email}</p>
          <p className="text-gray-400 text-xs mt-1">Member since January 2023</p>
        </div>
        <div className="ml-auto flex gap-3">
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl shadow-sm p-1 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab
                ? 'bg-primary text-black'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {activeTab === 'Profile' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
              <button
                onClick={() => setEditing(!editing)}
                className="text-sm text-primary hover:underline font-medium"
              >
                {editing ? 'Cancel' : '✏️ Edit'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { label: 'Full Name', key: 'name', type: 'text' },
                { label: 'Email Address', key: 'email', type: 'email' },
                { label: 'Phone Number', key: 'phone', type: 'tel' },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="text-sm font-medium text-gray-600 mb-1 block">{label}</label>
                  {editing ? (
                    <input
                      type={type}
                      value={formData[key]}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{formData[key]}</p>
                  )}
                </div>
              ))}

              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">Default Address</label>
                <p className="text-gray-800 font-medium text-sm">
                  {user.address.line1}, {user.address.city}, {user.address.state} – {user.address.pincode}
                </p>
              </div>
            </div>

            {editing && (
              <button
                onClick={() => setEditing(false)}
                className="mt-5 bg-primary hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold text-sm transition-colors"
              >
                Save Changes
              </button>
            )}
          </div>
        )}

        {activeTab === 'Orders' && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-5">My Orders</h2>
            <div className="space-y-4">
              {user.orders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-xl p-4 hover:border-primary transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold text-gray-900">{order.id}</p>
                      <p className="text-xs text-gray-500">Placed on {order.date} · {order.items} item(s)</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">{formatPrice(order.total)}</span>
                    <button className="text-sm text-primary hover:underline font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Addresses' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-800">Saved Addresses</h2>
              <button className="text-sm bg-primary text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
                + Add Address
              </button>
            </div>
            <div className="border-2 border-primary rounded-xl p-4 relative">
              <span className="absolute top-3 right-3 text-xs bg-primary text-black px-2 py-0.5 rounded-full font-semibold">Default</span>
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-600 mt-1">
                {user.address.line1}<br />
                {user.address.city}, {user.address.state} – {user.address.pincode}
              </p>
              <p className="text-sm text-gray-600 mt-1">{user.phone}</p>
              <div className="flex gap-3 mt-3">
                <button className="text-sm text-primary hover:underline">Edit</button>
                <button className="text-sm text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Settings' && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-5">Account Settings</h2>
            <div className="space-y-4">
              {[
                { label: 'Email Notifications', desc: 'Receive order updates and offers via email', enabled: true },
                { label: 'SMS Alerts', desc: 'Get delivery updates via SMS', enabled: true },
                { label: 'Push Notifications', desc: 'Allow browser push notifications', enabled: false },
                { label: 'Two-Factor Authentication', desc: 'Secure your account with 2FA', enabled: false },
              ].map((setting) => (
                <div key={setting.label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{setting.label}</p>
                    <p className="text-xs text-gray-500">{setting.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={setting.enabled} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
