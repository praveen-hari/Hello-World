import products, { categories } from '../data/products.js';
import { useAuth } from '../context/AuthContext.jsx';

const recentOrders = [
  { id: 'OD2001', customer: 'Anita Rao', amount: 24900, status: 'Delivered' },
  { id: 'OD2002', customer: 'Vikram Singh', amount: 99900, status: 'Shipped' },
  { id: 'OD2003', customer: 'Meera Nair', amount: 1299, status: 'Processing' },
  { id: 'OD2004', customer: 'Arjun Patel', amount: 7995, status: 'Cancelled' },
];

export default function Admin() {
  const { user } = useAuth();
  const lowStock = products.filter((p) => p.stock < 5);
  const revenue = recentOrders.reduce((s, o) => s + o.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
      <p className="text-sm text-gray-500 mb-4">Welcome back, {user.name}</p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          ['Total Products', products.length],
          ['Categories', categories.length],
          ['Revenue', `₹${revenue.toLocaleString('en-IN')}`],
          ['Low Stock Items', lowStock.length],
        ].map(([label, value]) => (
          <div key={label} className="bg-white dark:bg-gray-800 rounded shadow p-4">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
          <h2 className="font-bold mb-2">Recent Orders</h2>
          <table className="w-full text-sm text-left">
            <thead><tr className="border-b"><th className="py-1">ID</th><th>Customer</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-b">
                  <td className="py-1">{o.id}</td><td>{o.customer}</td><td>₹{o.amount}</td><td>{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
          <h2 className="font-bold mb-2">Low Stock Alerts</h2>
          <ul className="text-sm space-y-1">
            {lowStock.map((p) => (
              <li key={p.id} className="flex justify-between">
                <span>{p.name}</span>
                <span className="text-red-600">{p.stock} left</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
