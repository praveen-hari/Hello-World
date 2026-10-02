import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import products, { categories } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';

const banners = [
  { title: 'Big Billion Sale', text: 'Up to 60% off on Mobiles', color: 'bg-blue-600' },
  { title: 'Laptop Fest', text: 'Best deals on top brands', color: 'bg-purple-600' },
  { title: 'Fashion Week', text: 'Styles starting at ₹499', color: 'bg-pink-600' },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCurrent((c) => (c + 1) % banners.length);
    }, 3000);
  }, []);

  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex gap-3 overflow-x-auto mb-4 pb-2">
        {categories.map((c) => (
          <Link
            key={c}
            to={`/products?category=${encodeURIComponent(c)}`}
            className="bg-white dark:bg-gray-800 shadow rounded px-4 py-2 whitespace-nowrap text-sm"
          >
            {c}
          </Link>
        ))}
      </div>

      <div className={`${banners[current].color} text-white rounded p-10 mb-6`}>
        <h1 className="text-3xl font-bold">{banners[current].title}</h1>
        <p className="mt-2">{banners[current].text}</p>
        <Link to="/products" className="btn bg-white text-gray-900 inline-block mt-4">
          Shop now
        </Link>
      </div>

      <h2 className="text-xl font-bold mb-3">Top Rated Products</h2>
      <div className="grid grid-cols-4 gap-4">
        {topRated.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
