import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const liked = isInWishlist(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow hover:shadow-lg transition p-3 flex flex-col">
      <button
        onClick={() => (liked ? removeFromWishlist(product.id) : addToWishlist(product))}
        className="self-end text-xl"
        aria-label="Toggle wishlist"
      >
        {liked ? '♥' : '♡'}
      </button>
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-contain mb-2" />
        <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
      </Link>
      <p className="text-xs text-gray-500">{product.brand}</p>
      <div className="text-sm mt-1">
        <span className="bg-green-600 text-white px-1 rounded text-xs">{product.rating} ★</span>
        <span className="text-gray-500 ml-2 text-xs">({product.reviews})</span>
      </div>
      <div className="mt-1">
        <span className="font-bold">₹{product.price.toLocaleString('en-IN')}</span>
        <span className="line-through text-gray-400 text-xs ml-2">
          ₹{product.originalPrice.toLocaleString('en-IN')}
        </span>
        <span className="text-green-600 text-xs ml-2">{discount}% off</span>
      </div>
      <button
        onClick={() => addToCart(product)}
        className="btn bg-accent text-white mt-3 hover:opacity-90"
      >
        Add to Cart
      </button>
    </div>
  );
}
