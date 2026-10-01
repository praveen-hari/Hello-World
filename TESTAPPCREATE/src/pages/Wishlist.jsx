import { useShop } from '../context/ShopContext.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useShop()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
      {wishlist.length === 0 && <p>Nothing saved yet.</p>}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {wishlist.map((p) => (
          <div key={p.id}>
            <ProductCard product={p} />
            <button onClick={() => removeFromWishlist(p.id)} className="text-red-500 text-sm mt-1">Remove</button>
          </div>
        ))}
      </div>
    </div>
  )
}
