import { useState } from 'react'
import { useShop } from '../context/ShopContext.jsx'

export default function Profile() {
  const { user, setUser, orders } = useShop()
  const [form, setForm] = useState(user)
  const [saved, setSaved] = useState(false)

  const save = (e) => {
    e.preventDefault()
    setUser(form)
    setSaved(true)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <form onSubmit={save} className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-3">
        {['name', 'email', 'phone', 'address'].map((f) => (
          <div key={f}>
            <label className="block text-sm capitalize">{f}</label>
            <input value={form[f]} onChange={(e) => setForm({ ...form, [f]: e.target.value })} className="w-full border p-2 rounded text-black" />
          </div>
        ))}
        <button className="bg-orange-500 text-white px-4 py-2 rounded">Save</button>
        {saved && <span className="ml-3 text-green-600">Profile updated</span>}
      </form>
      <h2 className="text-xl font-bold mt-6 mb-2">Order History</h2>
      {orders.length === 0 ? <p>No orders yet.</p> : orders.map((o) => (
        <div key={o.id} className="bg-white dark:bg-gray-800 p-3 rounded shadow mb-2">
          <p>Order #{o.id} · {o.date} · {o.items.length} item(s)</p>
        </div>
      ))}
    </div>
  )
}
