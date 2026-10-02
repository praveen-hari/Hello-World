import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', pincode: '', payment: 'cod',
  });
  const [placed, setPlaced] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="max-w-xl mx-auto text-center py-20">
        <h1 className="text-3xl font-bold text-green-600 mb-2">Order placed successfully!</h1>
        <p>Thank you {form.name}. A confirmation will be sent to {form.email}.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 flex gap-6">
      <form onSubmit={handleSubmit} className="flex-1 bg-white dark:bg-gray-800 rounded shadow p-6 space-y-3">
        <h1 className="text-xl font-bold">Shipping Details</h1>
        {['name', 'email', 'phone', 'address', 'pincode'].map((f) => (
          <input
            key={f}
            name={f}
            value={form[f]}
            onChange={handleChange}
            placeholder={f[0].toUpperCase() + f.slice(1)}
            className="w-full border rounded px-3 py-2 text-gray-900"
          />
        ))}
        <select name="payment" value={form.payment} onChange={handleChange} className="w-full border rounded px-3 py-2 text-gray-900">
          <option value="cod">Cash on Delivery</option>
          <option value="upi">UPI</option>
          <option value="card">Credit / Debit Card</option>
        </select>
        <button className="btn bg-orange-600 text-white w-full">Place Order</button>
      </form>

      <aside className="w-80 bg-white dark:bg-gray-800 rounded shadow p-4 h-fit">
        <h2 className="font-bold mb-2">Order Summary</h2>
        {items.map((i) => (
          <div key={i.id} className="flex justify-between text-sm">
            <span>{i.name} x {i.quantity}</span>
            <span>₹{i.price * i.quantity}</span>
          </div>
        ))}
        <hr className="my-2" />
        <div className="flex justify-between font-bold"><span>Total</span><span>₹{subtotal}</span></div>
      </aside>
    </div>
  );
}
