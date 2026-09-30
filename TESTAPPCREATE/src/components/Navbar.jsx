import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { wishlist } = useWishlist();
  const { isLoggedIn, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-secondary text-white sticky top-0 z-50 shadow-lg">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary whitespace-nowrap flex-shrink-0">
          🛒 ShopKart
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex flex-1 max-w-2xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, brands and more..."
            className="flex-1 px-4 py-2 text-gray-900 rounded-l-md focus:outline-none text-sm"
          />
          <button
            type="submit"
            className="bg-primary hover:bg-yellow-500 text-black px-4 py-2 rounded-r-md font-semibold text-sm transition-colors"
          >
            🔍
          </button>
        </form>

        {/* Right actions */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
            title="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative p-2 hover:text-primary transition-colors">
            <span className="text-xl">❤️</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative p-2 hover:text-primary transition-colors">
            <span className="text-xl">🛒</span>
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* User */}
          {isLoggedIn ? (
            <div className="relative group">
              <button className="flex items-center gap-2 hover:text-primary transition-colors">
                <span className="text-sm font-medium hidden md:block">{user?.name?.split(' ')[0]}</span>
                <span className="text-xl">👤</span>
              </button>
              <div className="absolute right-0 top-full mt-1 w-48 bg-white text-gray-800 rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 text-sm">My Profile</Link>
                <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100 text-sm">My Orders</Link>
                <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100 text-sm">Admin Dashboard</Link>
                <hr className="my-1" />
                <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-primary text-black px-4 py-2 rounded-md font-semibold text-sm hover:bg-yellow-500 transition-colors"
            >
              Login
            </Link>
          )}

          {/* Hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Category Nav */}
      <div className="bg-gray-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {['Mobiles', 'Laptops', 'Audio', 'Wearables', 'Fashion', 'Home Appliances', 'Books', 'Sports'].map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="px-3 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white whitespace-nowrap transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-3">
          <div className="flex flex-col gap-2">
            {['Mobiles', 'Laptops', 'Audio', 'Wearables', 'Fashion', 'Home Appliances', 'Books', 'Sports'].map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                className="text-sm text-gray-200 hover:text-white py-1"
                onClick={() => setMenuOpen(false)}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
