import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === Number(id));

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6 flex gap-8">
        <img src={product.image} alt={product.name} className="w-96 h-96 object-contain" />
        <div className="flex-1">
          <p className="text-sm text-gray-500">{product.category} / {product.brand}</p>
          <h1 className="text-2xl font-bold mt-1">{product.name}</h1>
          <div className="my-2">
            <span className="bg-green-600 text-white px-2 rounded text-sm">{product.rating} ★</span>
            <span className="text-sm text-gray-500 ml-2">{product.reviews} reviews</span>
          </div>
          <p className="text-3xl font-bold">
            ₹{product.price.toLocaleString('en-IN')}
            <span className="text-base line-through text-gray-400 ml-3">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          </p>
          <p className="mt-4">{product.description}</p>
          <p className={`mt-2 font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `In stock (${product.stock} left)` : 'Out of stock'}
          </p>

          <div className="flex items-center gap-3 mt-4">
            <button className="btn border" onClick={() => setQty(qty - 1)}>-</button>
            <span>{qty}</span>
            <button className="btn border" onClick={() => setQty(qty + 1)}>+</button>
          </div>

          <div className="flex gap-3 mt-6">
            <button className="btn bg-accent text-white" onClick={() => addToCart(product, qty)}>
              Add to Cart
            </button>
            <button
              className="btn bg-orange-600 text-white"
              onClick={() => {
                addToCart(product, qty);
                navigate('/checkout');
              }}
            >
              Buy Now
            </button>
            <button className="btn border" onClick={() => addToWishlist(product)}>
              ♡ Wishlist
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-3">Related Products</h2>
      <div className="grid grid-cols-4 gap-4">
        {related.map((p) => (
          <div key={p.id} onClick={() => navigate(`/products/${p.id}`)} className="bg-white dark:bg-gray-800 p-3 rounded shadow cursor-pointer">
            <img src={p.image} alt={p.name} className="h-32 w-full object-contain" />
            <p className="text-sm mt-2">{p.name}</p>
            <p className="font-bold">₹{p.price.toLocaleString('en-IN')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
