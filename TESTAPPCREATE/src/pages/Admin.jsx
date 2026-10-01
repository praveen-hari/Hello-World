import products from '../data/products.js'
import { useShop } from '../context/ShopContext.jsx'

export default function Admin() {
  const { orders } = useShop()
  const revenue = orders.reduce((s, o) => s + o.items.reduce((t, i) => t + i.price * i.qty, 0), 0)
  const stats = [
    ['Products', products.length],
    ['Orders', orders.length],
    ['Revenue', `₹${revenue}`],
    ['Low stock', products.filter((p) => p.stock < 5).length],
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map(([label, value]) => (
          <div key={label} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow">
        <table className="w-full text-left text-sm">
          <thead className="border-b"><tr><th className="p-2">ID</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th></tr></thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-2">{p.id}</td><td>{p.name}</td><td>{p.category}</td><td>₹{p.price}</td><td>{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
