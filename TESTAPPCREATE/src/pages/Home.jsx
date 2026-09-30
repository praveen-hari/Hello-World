import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const banners = [
  {
    id: 1,
    title: 'Mega Electronics Sale',
    subtitle: 'Up to 40% off on Mobiles & Laptops',
    bg: 'from-blue-600 to-purple-700',
    emoji: '📱',
    link: '/products?category=Mobiles',
  },
  {
    id: 2,
    title: 'Fashion Week',
    subtitle: 'Trendy outfits starting at ₹499',
    bg: 'from-pink-500 to-rose-600',
    emoji: '👗',
    link: '/products?category=Fashion',
  },
  {
    id: 3,
    title: 'Home Appliances',
    subtitle: 'Make your home smarter',
    bg: 'from-green-500 to-teal-600',
    emoji: '🏠',
    link: '/products?category=Home Appliances',
  },
];

const categoryIcons = {
  Mobiles: '📱',
  Laptops: '💻',
  Audio: '🎧',
  Wearables: '⌚',
  Fashion: '👗',
  'Home Appliances': '🏠',
  Books: '📚',
  Sports: '⚽',
};

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);
  // BUG #8: Memory leak in useEffect — interval not cleared on unmount
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    // missing: return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();
  const featuredProducts = products.slice(0, 8);
  const dealProducts = products.filter((p) => p.badge === 'Deal' || p.badge === 'Best Seller');

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner Carousel */}
      <div className="relative overflow-hidden">
        <div
          className={`bg-gradient-to-r ${banners[currentBanner].bg} text-white py-16 px-8 transition-all duration-500`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{banners[currentBanner].title}</h1>
              <p className="text-xl opacity-90 mb-6">{banners[currentBanner].subtitle}</p>
              <Link
                to={banners[currentBanner].link}
                className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors inline-block"
              >
                Shop Now →
              </Link>
            </div>
            <div className="text-9xl hidden md:block">{banners[currentBanner].emoji}</div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBanner(i)}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === currentBanner ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
              >
                <span className="text-3xl">{categoryIcons[cat]}</span>
                <span className="text-xs font-medium text-gray-700 text-center group-hover:text-primary transition-colors">
                  {cat}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Deals Banner Row */}
        <section className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-xl p-6 flex items-center justify-between hover:scale-105 transition-transform cursor-pointer"
            onClick={() => navigate('/products?category=Mobiles')}>
            <div>
              <p className="text-sm font-semibold opacity-80">Flash Deal</p>
              <h3 className="text-xl font-bold">Mobiles up to 30% off</h3>
            </div>
            <span className="text-5xl">📱</span>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl p-6 flex items-center justify-between hover:scale-105 transition-transform cursor-pointer"
            onClick={() => navigate('/products?category=Audio')}>
            <div>
              <p className="text-sm font-semibold opacity-80">Weekend Sale</p>
              <h3 className="text-xl font-bold">Audio under ₹25,000</h3>
            </div>
            <span className="text-5xl">🎧</span>
          </div>
          <div className="bg-gradient-to-r from-teal-400 to-green-600 text-white rounded-xl p-6 flex items-center justify-between hover:scale-105 transition-transform cursor-pointer"
            onClick={() => navigate('/products?category=Books')}>
            <div>
              <p className="text-sm font-semibold opacity-80">Book Bonanza</p>
              <h3 className="text-xl font-bold">Books from ₹249</h3>
            </div>
            <span className="text-5xl">📚</span>
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
            <Link to="/products" className="text-primary font-semibold hover:underline text-sm">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Deals Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">🔥 Today's Deals</h2>
            <Link to="/products" className="text-primary font-semibold hover:underline text-sm">
              See All Deals →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dealProducts.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Trust Badges */}
        <section className="bg-white rounded-xl shadow-sm p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-10">
          {[
            { icon: '🚚', title: 'Free Delivery', sub: 'On orders above ₹499' },
            { icon: '↩️', title: 'Easy Returns', sub: '30-day return policy' },
            { icon: '🔒', title: 'Secure Payment', sub: '100% secure checkout' },
            { icon: '🎧', title: '24/7 Support', sub: 'Dedicated support team' },
          ].map((b) => (
            <div key={b.title} className="flex flex-col items-center gap-2">
              <span className="text-4xl">{b.icon}</span>
              <h4 className="font-bold text-gray-800">{b.title}</h4>
              <p className="text-xs text-gray-500">{b.sub}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
