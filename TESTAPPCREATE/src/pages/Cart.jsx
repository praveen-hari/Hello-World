import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  const subtotal = getCartTotal();
  const delivery = subtotal > 499 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05);
  // BUG #2 (visible effect): total uses getCartTotal which uses originalPrice
  const total = subtotal + delivery + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link
          to="/products"
          className="bg-primary text-black px-8 py-3 rounded-xl font-bold hover:bg-yellow-500 transition-colors inline-block"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Shopping Cart <span className="text-gray-500 font-normal text-base">({cartItems.length} items)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm p-5 flex gap-4">
              <Link to={`/product/${item.id}`} className="flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain bg-gray-50 rounded-lg p-2"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  to={`/product/${item.id}`}
                  className="font-medium text-gray-800 hover:text-primary line-clamp-2 block"
                >
                  {item.name}
                </Link>
                <p className="text-xs text-gray-500 mt-1">{item.brand}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-lg font-bold text-gray-900">{formatPrice(item.price)}</span>
                  <span className="text-sm text-gray-500 line-through">{formatPrice(item.originalPrice)}</span>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 font-bold"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={clearCart}
              className="text-sm text-red-500 hover:underline"
            >
              Clear Cart
            </button>
            <Link
              to="/products"
              className="text-sm text-primary hover:underline"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-800 mb-5">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className={delivery === 0 ? 'text-green-600 font-medium' : ''}>
                  {delivery === 0 ? 'FREE' : formatPrice(delivery)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (5% GST)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <hr className="border-dashed" />
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {delivery === 0 && (
              <div className="mt-3 text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                🎉 You saved on delivery!
              </div>
            )}

            {/* BUG #15: Checkout button enabled with empty cart — no cartItems.length check here, 
                but also enabled even if stock is 0 (always enabled regardless) */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full mt-5 bg-primary hover:bg-yellow-500 text-black py-3 rounded-xl font-bold transition-colors"
            >
              Proceed to Checkout →
            </button>

            <div className="mt-4 text-xs text-gray-500 text-center">
              🔒 Secure checkout • All major payment methods accepted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
