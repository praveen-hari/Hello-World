import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext.jsx'

export default function Checkout() {
  const { cart, placeOrder } = useShop()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', address: '', phone: '', card: '' })
  const [done, setDone] = useState(false)
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    placeOrder(form)
    setDone(true)
    setTimeout(() => navigate('/'), 3000)
  }

  if (done) return <p className="text-center text-green-600 text-xl p-10">Order placed successfully! 🎉</p>

  return (
    <form onSubmit={submit} className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow space-y-3">
      <h1 className="text-2xl font-bold">Checkout</h1>
      {['name', 'email', 'address', 'phone', 'card'].map((f) => (
        <input key={f} name={f} value={form[f]} onChange={change} placeholder={f.toUpperCase()} className="w-full border p-2 rounded text-black" />
      ))}
      <p className="font-bold">Order total: ₹{total}</p>
      <button className="w-full bg-orange-500 text-white py-2 rounded">Place Order</button>
    </form>
  )
}
