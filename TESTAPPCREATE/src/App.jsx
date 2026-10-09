import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Wishlist from './pages/Wishlist'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
