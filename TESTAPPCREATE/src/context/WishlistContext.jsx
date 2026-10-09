import { createContext, useContext, useState } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([])

  const addToWishlist = (product) => setWishlist([...wishlist, product])
  const removeFromWishlist = (id) => setWishlist(wishlist.filter((p) => p.id !== id))
  const isInWishlist = (id) => wishlist.some((p) => p.id === id)

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
