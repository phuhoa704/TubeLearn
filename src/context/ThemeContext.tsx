import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type ThemeType = 'blue' | 'pink' | 'mint' | 'lavender' | 'peach'
export type ModeType = 'light' | 'dark'

interface ThemeContextType {
  theme: ThemeType
  mode: ModeType
  changeTheme: (theme: ThemeType) => void
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('theme') as ThemeType
    return ['blue', 'pink', 'mint', 'lavender', 'peach'].includes(saved) ? saved : 'blue'
  })

  const [mode, setMode] = useState<ModeType>(() => {
    const saved = localStorage.getItem('mode') as ModeType
    return ['light', 'dark'].includes(saved) ? saved : 'light'
  })

  // Apply theme & mode to document.documentElement (html element)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode)
    localStorage.setItem('mode', mode)
  }, [mode])

  const changeTheme = (newTheme: ThemeType) => {
    setTheme(newTheme)
  }

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, mode, changeTheme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useAppTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useAppTheme must be used within a ThemeProvider')
  }
  return context
}
