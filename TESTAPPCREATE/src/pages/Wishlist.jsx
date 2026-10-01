import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-8xl mb-6">❤️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-8">Save your favourite items here to buy later.</p>
        <Link
          to="/products"
          className="bg-primary text-black px-8 py-3 rounded-xl font-bold hover:bg-yellow-500 transition-colors inline-block"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        My Wishlist <span className="text-gray-500 font-normal text-base">({wishlist.length} items)</span>
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
