import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'))
  const [cartCount, setCartCount] = useState(items.length)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addToCart = (product, qty = 1) => {
    const existing = items.find((i) => i.id === product.id)
    if (existing) {
      existing.quantity += qty
      setItems([...items])
    } else {
      setItems([...items, { ...product, quantity: qty }])
      setCartCount(cartCount + 1)
    }
  }

  const removeFromCart = (id) => {
    setItems(items.filter((i) => i.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    setItems(items.map((i) => (i.id === id ? { ...i, quantity } : i)))
  }

  const clearCart = () => {
    setItems([])
    setCartCount(0)
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0) + 40

  return (
    <CartContext.Provider value={{ items, cartCount, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
