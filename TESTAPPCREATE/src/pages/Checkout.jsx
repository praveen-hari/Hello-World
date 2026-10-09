import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', pincode: '', payment: 'cod' })
  const [placed, setPlaced] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    setPlaced(true)
    clearCart()
  }

  if (placed) return <h1 className="text-2xl font-bold text-green-600">Order placed successfully! 🎉</h1>

  return (
    <form onSubmit={submit} className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow space-y-3">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <input className="input" name="name" placeholder="Full name" value={form.name} onChange={onChange} />
      <input className="input" name="email" placeholder="Email" value={form.email} onChange={onChange} />
      <input className="input" name="phone" placeholder="Phone" value={form.phone} onChange={onChange} />
      <textarea className="input" name="address" placeholder="Address" value={form.address} onChange={onChange} />
      <input className="input" name="pincode" placeholder="Pincode" value={form.pincode} onChange={onChange} />
      <select className="input" name="payment" value={form.payment} onChange={onChange}>
        <option value="cod">Cash on Delivery</option>
        <option value="card">Credit/Debit Card</option>
        <option value="upi">UPI</option>
      </select>
      <p className="font-bold">Items: {items.length} | Payable: ₹{total}</p>
      <button type="submit" className="btn bg-orange-500 text-white w-full">Place Order</button>
    </form>
  )
}
