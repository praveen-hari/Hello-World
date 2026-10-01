import { Link } from 'react-router-dom'
import products, { categories } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded p-10 mb-6">
        <h1 className="text-4xl font-bold">Big Billion Sale</h1>
        <p className="mt-2">Up to 60% off on top brands</p>
        <Link to="/products" className="inline-block mt-4 bg-white text-orange-600 px-4 py-2 rounded">Shop Now</Link>
      </section>
      <h2 className="text-xl font-bold mb-2">Shop by Category</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((c) => (
          <Link key={c} to={`/products?category=${c}`} className="bg-white dark:bg-gray-800 shadow px-4 py-2 rounded">{c}</Link>
        ))}
      </div>
      <h2 className="text-xl font-bold mb-2">Featured Products</h2>
      <div className="grid grid-cols-4 gap-4">
        {products.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
