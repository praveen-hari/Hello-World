import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-50 h-48">
          {/* BUG #14: Image loading issue — no fallback for broken image URLs, onerror not handled */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
          {product.badge && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              {product.badge}
            </span>
          )}
          <button
            onClick={handleWishlist}
            className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform"
          >
            <span className={isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400'}>
              ❤️
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 flex-1">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
              ★ {product.rating}
            </span>
            <span className="text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
            <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            {discount > 0 && (
              <span className="text-sm font-semibold text-green-600">{discount}% off</span>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-yellow-500 text-black py-2 rounded-lg font-semibold text-sm transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
