import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist()
  if (wishlist.length === 0) return <p>Your wishlist is empty.</p>
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">My Wishlist</h1>
      <div className="grid grid-cols-4 gap-4">
        {wishlist.map((p) => (
          <div key={p.id}>
            <ProductCard product={p} />
            <button className="text-red-600 text-sm mt-1" onClick={() => removeFromWishlist(p.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  )
}
