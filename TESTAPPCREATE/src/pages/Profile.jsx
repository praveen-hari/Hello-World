import { useState } from 'react'

const orders = [
  { id: 'OD1001', date: '2024-01-12', total: 69999, status: 'Delivered' },
  { id: 'OD1002', date: '2024-02-03', total: 1499, status: 'Shipped' },
  { id: 'OD1003', date: '2024-02-20', total: 2999, status: 'Processing' },
]

export default function Profile() {
  const [user, setUser] = useState({ name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210' })
  const [saved, setSaved] = useState(false)

  const save = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      <form onSubmit={save} className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-3">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <input className="input" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
        <input className="input" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <input className="input" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
        <button className="btn bg-blue-600 text-white">Save</button>
        {saved && <span className="text-green-600 ml-3">Saved!</span>}
      </form>
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-3">Order History</h2>
        {orders.map((o) => (
          <div key={o.id} className="flex justify-between border-b py-2">
            <span>{o.id} ({o.date})</span>
            <span>₹{o.total}</span>
            <span>{o.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
