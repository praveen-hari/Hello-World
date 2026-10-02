import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const orders = [
  { id: 'OD1024', date: '2024-05-12', total: 74999, status: 'Delivered' },
  { id: 'OD1031', date: '2024-06-02', total: 1499, status: 'Shipped' },
  { id: 'OD1045', date: '2024-06-21', total: 12995, status: 'Processing' },
];

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState(user);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    updateUser(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 grid md:grid-cols-2 gap-6">
      <form onSubmit={handleSave} className="bg-white dark:bg-gray-800 rounded shadow p-6 space-y-3">
        <h1 className="text-xl font-bold">My Profile</h1>
        {['name', 'email', 'phone', 'address'].map((f) => (
          <div key={f}>
            <label className="text-sm capitalize">{f}</label>
            <input
              name={f}
              value={form[f]}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-gray-900"
            />
          </div>
        ))}
        <button className="btn bg-brand text-white">Save Changes</button>
        {saved && <span className="text-green-600 ml-3 text-sm">Profile updated!</span>}
      </form>

      <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
        <h2 className="text-xl font-bold mb-3">Order History</h2>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b"><th className="py-2">Order</th><th>Date</th><th>Total</th><th>Status</th></tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b">
                <td className="py-2">{o.id}</td>
                <td>{o.date}</td>
                <td>₹{o.total}</td>
                <td>{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
