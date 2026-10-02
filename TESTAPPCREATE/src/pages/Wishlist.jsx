import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext.jsx';
import ProductCard from '../components/ProductCard.jsx';

export default function Wishlist() {
  const { wishlist } = useWishlist();
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">My Wishlist ({wishlist.length})</h1>
      {wishlist.length === 0 ? (
        <p>Nothing here yet. <Link to="/products" className="text-brand underline">Browse products</Link></p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {wishlist.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
