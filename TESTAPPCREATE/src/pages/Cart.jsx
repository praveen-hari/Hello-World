import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();
  const shipping = subtotal > 500 ? 0 : 40;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">My Cart ({items.length})</h1>
      {items.length === 0 && (
        <div className="text-center py-16">
          <p className="mb-4">Your cart is empty.</p>
          <Link to="/products" className="text-brand underline">Continue shopping</Link>
        </div>
      )}
      <div className="flex gap-6">
        <div className="flex-1 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded shadow p-4 flex gap-4 items-center">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-contain" />
              <div className="flex-1">
                <Link to={`/products/${item.id}`} className="font-semibold">{item.name}</Link>
                <p className="text-sm text-gray-500">{item.brand}</p>
                <p className="font-bold">₹{item.price.toLocaleString('en-IN')}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn border" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button className="btn border" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button className="text-red-600 text-sm" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <aside className="w-80 bg-white dark:bg-gray-800 rounded shadow p-4 h-fit">
          <h2 className="font-bold mb-3">Price Details</h2>
          <div className="flex justify-between text-sm mb-1"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="flex justify-between text-sm mb-1"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
          <hr className="my-2" />
          <div className="flex justify-between font-bold"><span>Total</span><span>₹{total}</span></div>
          <Link to="/checkout" className="btn bg-orange-600 text-white block text-center mt-4">
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
