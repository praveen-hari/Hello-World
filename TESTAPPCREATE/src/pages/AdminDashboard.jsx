import { useState } from 'react';
import { products } from '../data/products';

const tabs = ['Overview', 'Products', 'Orders', 'Customers'];

// BUG #12: State mutation bug — directly mutating product array in admin
const mockOrders = [
  { id: 'ORD-2001', customer: 'Ankit Sharma', date: '2024-03-10', total: 124999, status: 'Processing', items: 1 },
  { id: 'ORD-2002', customer: 'Sneha Patel', date: '2024-03-09', total: 26990, status: 'Shipped', items: 2 },
  { id: 'ORD-2003', customer: 'Vivek Nair', date: '2024-03-08', total: 3499, status: 'Delivered', items: 3 },
  { id: 'ORD-2004', customer: 'Kavya Reddy', date: '2024-03-07', total: 64999, status: 'Delivered', items: 1 },
  { id: 'ORD-2005', customer: 'Rohan Mehta', date: '2024-03-06', total: 8999, status: 'Cancelled', items: 2 },
];

const statusColors = {
  Delivered: 'bg-green-100 text-green-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Processing: 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const metrics = [
  { label: 'Total Revenue', value: '₹24,56,890', change: '+12.5%', positive: true, icon: '💰' },
  { label: 'Total Orders', value: '1,234', change: '+8.2%', positive: true, icon: '📦' },
  { label: 'Active Customers', value: '5,678', change: '+15.1%', positive: true, icon: '👥' },
  { label: 'Return Rate', value: '3.4%', change: '-0.8%', positive: true, icon: '↩️' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [adminProducts, setAdminProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  // BUG #12: State mutation — modifying the shared products array directly instead of using setAdminProducts with a new array
  const handleToggleStock = (productId) => {
    const idx = adminProducts.findIndex((p) => p.id === productId);
    adminProducts[idx].stock = adminProducts[idx].stock > 0 ? 0 : 10;
    setAdminProducts([...adminProducts]);
  };

  const filteredProducts = adminProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoryStats = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, Admin 👋</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl shadow-sm p-1 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab ? 'bg-secondary text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <div>
          {/* Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {metrics.map((m) => (
              <div key={m.label} className="bg-white rounded-xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{m.icon}</span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    m.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {m.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{m.value}</p>
                <p className="text-xs text-gray-500 mt-1">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-5">Products by Category</h3>
              <div className="space-y-3">
                {Object.entries(categoryStats).map(([cat, count]) => (
                  <div key={cat} className="flex items-center gap-3">
                    <span className="text-sm text-gray-700 w-32">{cat}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${(count / products.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 w-6">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-5">Recent Orders</h3>
              <div className="space-y-3">
                {mockOrders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium text-gray-800">{order.id}</p>
                      <p className="text-xs text-gray-500">{order.customer}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Products' && (
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:border-primary"
            />
            <span className="text-sm text-gray-500">{filteredProducts.length} products</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">Product</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">Category</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">Price</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">Stock</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">Rating</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 object-contain bg-gray-100 rounded-lg p-1" />
                        <span className="font-medium text-gray-800 max-w-xs truncate">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{p.category}</td>
                    <td className="px-4 py-3 font-semibold">{formatPrice(p.price)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                        ★ {p.rating}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-xs text-primary hover:underline">Edit</button>
                        <button
                          onClick={() => handleToggleStock(p.id)}
                          className="text-xs text-gray-500 hover:underline"
                        >
                          {p.stock > 0 ? 'Disable' : 'Enable'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Orders' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-800">All Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">Order ID</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">Customer</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">Date</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">Items</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">Total</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">Status</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-primary">{order.id}</td>
                    <td className="px-4 py-3">{order.customer}</td>
                    <td className="px-4 py-3 text-gray-600">{order.date}</td>
                    <td className="px-4 py-3">{order.items}</td>
                    <td className="px-4 py-3 font-semibold">{formatPrice(order.total)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-xs text-primary hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Customers' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-5">Customer Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {[
              { label: 'Total Customers', value: '5,678', icon: '👥' },
              { label: 'New This Month', value: '342', icon: '🆕' },
              { label: 'Repeat Customers', value: '68%', icon: '🔄' },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 text-center">Detailed customer analytics coming soon...</p>
        </div>
      )}
    </div>
  );
}
