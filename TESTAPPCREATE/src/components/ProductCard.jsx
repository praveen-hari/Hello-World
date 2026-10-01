import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext.jsx'

export default function ProductCard({ product }) {
  const { addToCart, addToWishlist } = useShop()
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-3 flex flex-col">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
        <h3 className="font-semibold mt-2">{product.name}</h3>
      </Link>
      <p className="text-sm text-gray-500">{product.category} · ⭐ {product.rating}</p>
      <p className="font-bold text-lg">₹{product.price}</p>
      <div className="flex gap-2 mt-auto pt-2">
        <button onClick={() => addToCart(product)} className="flex-1 bg-orange-500 text-white py-1 rounded">Add to Cart</button>
        <button onClick={() => addToWishlist(product)} className="border px-3 rounded">♡</button>
      </div>
    </div>
  )
}
