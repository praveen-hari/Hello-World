import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext.jsx'

export default function Navbar() {
  const { cart, wishlist, darkMode, toggleDarkMode } = useShop()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/products?q=${query}`)
  }

  return (
    <header className="bg-slate-800 text-white sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center gap-4 p-3">
        <Link to="/" className="text-2xl font-bold text-orange-400">ShopEasy</Link>
        <form onSubmit={handleSearch} className="flex flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-3 py-2 rounded-l text-black"
          />
          <button className="bg-orange-500 px-4 rounded-r">Search</button>
        </form>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/products">Products</Link>
          <Link to="/wishlist">Wishlist ({wishlist.length})</Link>
          <Link to="/cart">Cart ({cart.length})</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/admin">Admin</Link>
          <button onClick={toggleDarkMode} className="border px-2 py-1 rounded">
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </nav>
      </div>
    </header>
  )
}
