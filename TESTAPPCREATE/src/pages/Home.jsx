import { Link } from 'react-router-dom'
import products, { categories } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const featured = products.filter((p) => p.rating >= 4).slice(0, 8)
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded p-10 mb-6">
        <h1 className="text-4xl font-bold">Big Billion Sale</h1>
        <p className="mt-2">Up to 50% off on electronics, fashion and more</p>
        <Link to="/products" className="btn bg-yellow-400 text-black inline-block mt-4">Shop Now</Link>
      </div>
      <div className="flex gap-3 overflow-x-auto mb-6">
        {categories.map((c) => (
          <Link key={c} to={`/products?category=${c}`} className="bg-white dark:bg-gray-800 shadow rounded px-4 py-3 whitespace-nowrap">
            {c}
          </Link>
        ))}
      </div>
      <h2 className="text-2xl font-bold mb-3">Featured Products</h2>
      <div className="grid grid-cols-4 gap-4">
        {featured.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
