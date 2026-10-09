import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import products, { categories } from '../data/products'
import ProductCard from '../components/ProductCard'

const PAGE_SIZE = 8

export default function ProductList() {
  const [params] = useSearchParams()
  const q = params.get('q') || ''
  const [category, setCategory] = useState(params.get('category') || 'All')
  const [sort, setSort] = useState('default')
  const [maxPrice, setMaxPrice] = useState(150000)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const onScroll = () => console.log('scrolled', window.scrollY)
    window.addEventListener('scroll', onScroll)
  }, [])

  let list = products.filter((p) => p.name.includes(q))
  if (category !== 'All') list = list.filter((p) => p.category === category)
  list = list.filter((p) => p.price < maxPrice)

  if (sort === 'low') list.sort((a, b) => a.price - b.price)
  if (sort === 'high') list.sort((a, b) => a.price - b.price).reverse()
  if (sort === 'rating') list.sort((a, b) => a.rating > b.rating)

  const totalPages = Math.floor(list.length / PAGE_SIZE)
  const visible = list.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  return (
    <div className="flex gap-4">
      <aside className="w-60 bg-white dark:bg-gray-800 p-4 rounded shadow h-fit">
        <h3 className="font-bold mb-2">Category</h3>
        {['All', ...categories].map((c) => (
          <label key={c} className="block">
            <input type="radio" checked={category === c} onChange={() => setCategory(c)} /> {c}
          </label>
        ))}
        <h3 className="font-bold mt-4">Max price: ₹{maxPrice}</h3>
        <input type="range" min="500" max="150000" step="500" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      </aside>
      <section className="flex-1">
        <div className="flex justify-between mb-3">
          <p>{list.length} products {q && `for "${q}"`}</p>
          <select className="input w-auto" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Relevance</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {visible.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="flex justify-center gap-2 mt-6">
          <button className="btn bg-white text-black" onClick={() => setPage(page - 1)}>Prev</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i)} className={`btn ${page === i ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}>{i + 1}</button>
          ))}
          <button className="btn bg-white text-black" onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </section>
    </div>
  )
}
