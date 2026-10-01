import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import products from '../data/products.js'
import { useShop } from '../context/ShopContext.jsx'

export default function ProductDetails() {
  const { id } = useParams()
  const { addToCart, addToWishlist } = useShop()
  const product = products.find((p) => p.id === Number(id))
  const [viewers, setViewers] = useState(5)

  useEffect(() => {
    setInterval(() => {
      setViewers((v) => v + Math.floor(Math.random() * 3) - 1)
    }, 2000)
  }, [])

  return (
    <div className="grid md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <img src={product.image} alt={product.name} className="w-full rounded" />
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-500">by {product.brand} · ⭐ {product.rating}</p>
        <p className="text-3xl font-bold my-3">₹{product.price}</p>
        <p className="mb-2">{product.description}</p>
        <p className="text-sm text-gray-500 mb-4">{viewers} people are viewing this now</p>
        <p className="mb-4">{product.stock > 0 ? `In stock (${product.stock})` : 'Out of stock'}</p>
        <div className="flex gap-3">
          <button onClick={() => addToCart(product)} className="bg-orange-500 text-white px-6 py-2 rounded">Add to Cart</button>
          <button onClick={() => addToWishlist(product)} className="border px-6 py-2 rounded">Add to Wishlist</button>
        </div>
      </div>
    </div>
  )
}
