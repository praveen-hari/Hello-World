import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(localStorage.getItem('dark') === 'true')

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark')
    localStorage.setItem('dark', dark)
  }, [dark])

  const toggleTheme = () => setDark(!dark)

  return <ThemeContext.Provider value={{ dark, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
