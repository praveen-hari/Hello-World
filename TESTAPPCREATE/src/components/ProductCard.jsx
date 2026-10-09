import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { addToWishlist } = useWishlist()
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-3 flex flex-col relative">
      <button onClick={() => addToWishlist(product)} className="absolute right-4 top-4 text-xl" aria-label="wishlist">♡</button>
      <Link to={`/product/${product.id}`}>
        <img src={product.image} className="w-[300px] h-48 object-cover mx-auto rounded" />
        <h3 className="mt-2 font-semibold">{product.name}</h3>
      </Link>
      <p className="text-sm text-gray-500">{product.brand} • {product.category}</p>
      <p className="text-sm">⭐ {product.rating} ({product.reviews})</p>
      <div className="mt-1">
        <span className="font-bold text-lg">₹{product.price}</span>{' '}
        <span className="line-through text-gray-400 text-sm">₹{product.originalPrice}</span>{' '}
        <span className="text-green-600 text-sm">{discount}% off</span>
      </div>
      <button onClick={() => addToCart(product)} className="btn bg-yellow-400 text-black mt-auto">Add to Cart</button>
    </div>
  )
}
