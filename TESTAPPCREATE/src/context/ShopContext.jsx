import { createContext, useContext, useState, useEffect } from 'react'

const ShopContext = createContext()

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'))
  const [wishlist, setWishlist] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState({ name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', address: '12 MG Road, Bengaluru' })
  const [orders, setOrders] = useState([])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    const existing = cart.find((i) => i.id === product.id)
    if (existing) {
      existing.qty += 1
      setCart(cart)
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }
  }

  const removeFromCart = (id) => setCart(cart.filter((i) => i.id !== id))

  const updateQty = (id, qty) => {
    setCart(cart.map((i) => (i.id === id ? { ...i, qty } : i)))
  }

  const clearCart = () => setCart([])

  const addToWishlist = (product) => setWishlist([...wishlist, product])
  const removeFromWishlist = (id) => setWishlist(wishlist.filter((p) => p.id !== id))

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const placeOrder = (details) => {
    setOrders([...orders, { id: Date.now(), items: cart, details, date: new Date().toLocaleDateString() }])
    clearCart()
  }

  return (
    <ShopContext.Provider
      value={{ cart, wishlist, darkMode, user, orders, setUser, addToCart, removeFromCart, updateQty, clearCart, addToWishlist, removeFromWishlist, toggleDarkMode, placeOrder }}
    >
      {children}
    </ShopContext.Provider>
  )
}

export const useShop = () => useContext(ShopContext)
