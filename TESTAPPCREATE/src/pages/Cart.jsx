import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total } = useCart()
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-3">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        {items.length === 0 && <p>Your cart is empty.</p>}
        {items.map((i) => (
          <div key={i.id} className="bg-white dark:bg-gray-800 p-3 rounded shadow flex gap-4 items-center">
            <img src={i.image} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-semibold">{i.name}</h3>
              <p>₹{i.price}</p>
            </div>
            <input type="number" value={i.quantity} onChange={(e) => updateQuantity(i.id, e.target.value)} className="input w-20" />
            <button className="text-red-600" onClick={() => removeFromCart(i.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow h-fit">
        <h2 className="font-bold text-lg mb-2">Price Details</h2>
        <p className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></p>
        <p className="flex justify-between"><span>Delivery</span><span>₹40</span></p>
        <hr className="my-2" />
        <p className="flex justify-between font-bold"><span>Total</span><span>₹{total}</span></p>
        <Link to="/checkout" className="btn bg-orange-500 text-white block text-center mt-4">Proceed to Checkout</Link>
      </div>
    </div>
  )
}
