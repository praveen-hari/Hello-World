import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { dark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  return (
    <header className="bg-brand text-white sticky top-0 z-20 shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="text-2xl font-bold italic">
          ShopZone
        </Link>
        <form onSubmit={handleSearch} className="flex flex-1 min-w-[400px]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, brands and more"
            className="flex-1 px-3 py-2 rounded-l text-gray-900 outline-none"
          />
          <button className="bg-accent px-4 rounded-r font-semibold">Search</button>
        </form>
        <nav className="flex items-center gap-5 text-sm whitespace-nowrap">
          <Link to="/products">Products</Link>
          <Link to="/wishlist">Wishlist ({wishlist.length})</Link>
          <Link to="/cart">Cart ({cartCount})</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/admin">Admin</Link>
          <button onClick={toggleTheme} className="border border-white rounded px-2 py-1">
            {dark ? 'Light' : 'Dark'}
          </button>
        </nav>
      </div>
    </header>
  );
}
