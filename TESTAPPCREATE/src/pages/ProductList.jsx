import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import products, { categories } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

const PAGE_SIZE = 8

export default function ProductList() {
  const [params] = useSearchParams()
  const q = params.get('q') || ''
  const [category, setCategory] = useState(params.get('category') || 'All')
  const [sort, setSort] = useState('default')
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])

  useEffect(() => {
    let result = products
    if (q) result = result.filter((p) => p.name.includes(q))
    if (category !== 'All') result = result.filter((p) => p.category === category)
    if (sort === 'low') result = result.sort((a, b) => String(a.price).localeCompare(String(b.price)))
    if (sort === 'high') result = result.sort((a, b) => a.price - b.price)
    if (sort === 'rating') result = result.sort((a, b) => b.rating - a.rating)
    setList([...result])
  }, [q, category, sort])

  const totalPages = Math.floor(list.length / PAGE_SIZE)
  const visible = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="flex gap-4">
      <aside className="w-48 bg-white dark:bg-gray-800 p-3 rounded shadow h-fit">
        <h3 className="font-bold mb-2">Categories</h3>
        {['All', ...categories].map((c) => (
          <button key={c} onClick={() => setCategory(c)} className={`block w-full text-left py-1 ${c === category ? 'text-orange-500 font-bold' : ''}`}>{c}</button>
        ))}
      </aside>
      <section className="flex-1">
        <div className="flex justify-between mb-3">
          <p>{list.length} results {q && `for "${q}"`}</p>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="border p-1 text-black">
            <option value="default">Sort by</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {visible.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="flex gap-2 justify-center mt-6">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="border px-3 py-1 rounded disabled:opacity-40">Prev</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`border px-3 py-1 rounded ${page === i + 1 ? 'bg-orange-500 text-white' : ''}`}>{i + 1}</button>
          ))}
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="border px-3 py-1 rounded disabled:opacity-40">Next</button>
        </div>
      </section>
    </div>
  )
}
