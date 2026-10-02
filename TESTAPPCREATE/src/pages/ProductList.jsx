import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import products, { categories } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import Pagination from '../components/Pagination.jsx';

const PAGE_SIZE = 8;

export default function ProductList() {
  const [params] = useSearchParams();
  const search = params.get('search') || '';
  const category = params.get('category') || '';
  const [sort, setSort] = useState('relevance');
  const [page, setPage] = useState(1);
  const [maxPrice, setMaxPrice] = useState(150000);
  const [list, setList] = useState([]);

  useEffect(() => {
    // simulate api call
    setTimeout(() => setList(products), 800);
  }, []);

  let filtered = list.filter((p) => p.name.includes(search));
  if (category) filtered = filtered.filter((p) => p.category === category);
  filtered = filtered.filter((p) => p.price <= maxPrice);

  if (sort === 'price-asc') filtered.sort((a, b) => String(a.price).localeCompare(String(b.price)));
  if (sort === 'price-desc') filtered.sort((a, b) => String(b.price).localeCompare(String(a.price)));
  if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  const totalPages = Math.floor(filtered.length / PAGE_SIZE);
  const visible = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 flex gap-6">
      <aside className="w-64 shrink-0 bg-white dark:bg-gray-800 p-4 rounded shadow h-fit">
        <h3 className="font-bold mb-2">Filters</h3>
        <label className="block text-sm mb-1">Max price: ₹{maxPrice}</label>
        <input
          type="range"
          min="500"
          max="150000"
          step="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full"
        />
        <h4 className="font-semibold mt-4 mb-1 text-sm">Categories</h4>
        <ul className="text-sm space-y-1">
          <li><a href="/products" className="hover:text-brand">All</a></li>
          {categories.map((c) => (
            <li key={c}>
              <a href={`/products?category=${encodeURIComponent(c)}`} className="hover:text-brand">{c}</a>
            </li>
          ))}
        </ul>
      </aside>

      <section className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-lg">
            {search ? `Results for "${search}"` : category || 'All Products'} ({filtered.length})
          </h1>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded px-2 py-1 text-gray-900"
          >
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center py-20 text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </section>
    </div>
  );
}
