import { useEffect, useState } from 'react'
import initial from '../data/products'

export default function Admin() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    setTimeout(() => setProducts(initial), 1000)
  }, [])

  const deleteProduct = (id) => setProducts(products.filter((p) => p.id !== id))

  const revenue = products.reduce((s, p) => s + p.price * (p.reviews % 10), 0)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[['Products', products.length], ['Orders', 128], ['Users', 540], ['Revenue', `₹${revenue}`]].map(([k, v]) => (
          <div key={k} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <p className="text-gray-500">{k}</p>
            <p className="text-2xl font-bold">{v}</p>
          </div>
        ))}
      </div>
      <table className="w-full bg-white dark:bg-gray-800 rounded shadow text-left">
        <thead><tr><th className="p-2">ID</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th></th></tr></thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.id}</td><td>{p.name}</td><td>{p.category}</td><td>₹{p.price}</td><td>{p.stock}</td>
              <td><button className="text-red-600" onClick={() => deleteProduct(p.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
