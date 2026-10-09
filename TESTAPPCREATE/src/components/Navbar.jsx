import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { cartCount } = useCart()
  const { wishlist } = useWishlist()
  const { dark, toggleTheme } = useTheme()

  const onSearch = (e) => {
    e.preventDefault()
    navigate(`/products?q=${query}`)
  }

  return (
    <header className="bg-blue-700 text-white sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
        <Link to="/" className="text-2xl font-bold italic">ShopEasy</Link>
        <form onSubmit={onSearch} className="flex flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, brands and more"
            className="flex-1 px-3 py-2 rounded-l text-black w-96"
          />
          <button className="bg-yellow-400 text-black px-4 rounded-r">Search</button>
        </form>
        <nav className="flex gap-6 items-center">
          <Link to="/products">Products</Link>
          <Link to="/wishlist">Wishlist ({wishlist.length})</Link>
          <Link to="/cart">Cart ({cartCount})</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/admin">Admin</Link>
          <button onClick={toggleTheme} className="border rounded px-2">{dark ? 'Light' : 'Dark'}</button>
        </nav>
      </div>
    </header>
  )
}
