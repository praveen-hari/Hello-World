import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext.jsx'

export default function Cart() {
  const { cart, removeFromCart, updateQty } = useShop()
  const total = cart.reduce((sum, i) => sum + i.price, 0)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      {cart.map((item) => (
        <div key={item.id} className="flex items-center gap-4 bg-white dark:bg-gray-800 p-3 rounded shadow mb-2">
          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
          <div className="flex-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p>₹{item.price}</p>
          </div>
          <input type="number" value={item.qty} onChange={(e) => updateQty(item.id, e.target.value)} className="w-16 border p-1 text-black" />
          <button onClick={() => removeFromCart(item.id)} className="text-red-500">Remove</button>
        </div>
      ))}
      <div className="text-right mt-4">
        <p className="text-xl font-bold">Total: ₹{total}</p>
        <Link to="/checkout" className="inline-block mt-2 bg-orange-500 text-white px-6 py-2 rounded">Proceed to Checkout</Link>
      </div>
    </div>
  )
}
