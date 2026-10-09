import { useParams } from 'react-router-dom'
import { useState } from 'react'
import products from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function ProductDetails() {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))
  const { addToCart } = useCart()
  const { addToWishlist } = useWishlist()
  const [qty, setQty] = useState(1)

  return (
    <div className="grid grid-cols-2 gap-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <img src={product.image} alt={product.name} className="w-full rounded" />
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-500">{product.brand} • {product.category}</p>
        <p className="mt-2">⭐ {product.rating} ({product.reviews} reviews)</p>
        <p className="text-3xl font-bold mt-4">₹{product.price}</p>
        <p className="line-through text-gray-400">₹{product.originalPrice}</p>
        <p className="mt-4">{product.description}</p>
        <p className={`mt-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {product.stock > 0 ? `In stock (${product.stock} left)` : 'Out of stock'}
        </p>
        <div className="flex items-center gap-2 mt-4">
          <button className="btn bg-gray-200 text-black" onClick={() => setQty(qty - 1)}>-</button>
          <span>{qty}</span>
          <button className="btn bg-gray-200 text-black" onClick={() => setQty(qty + 1)}>+</button>
        </div>
        <div className="flex gap-3 mt-6">
          <button className="btn bg-yellow-400 text-black" onClick={() => addToCart(product, qty)}>Add to Cart</button>
          <button className="btn bg-orange-500 text-white" onClick={() => addToWishlist(product)}>Add to Wishlist</button>
        </div>
      </div>
    </div>
  )
}
