import { createContext, useContext, useEffect, useState } from "react"

type User = {
  id: number
  name: string
  email: string
  date_of_birth: string
  created_at: string
  updated_at: string
}

interface AuthContextType {
    user: User | null
    setUser: (user: User | null) => void
    logout: () => void
    loading: boolean
  }
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined)
  
  export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
  
    const logout = () => {
      setUser(null)
      localStorage.removeItem("user")
    }
  
    useEffect(() => {
      const stored = localStorage.getItem("user")
      if (stored) {
        setUser(JSON.parse(stored))
      }
      setLoading(false)
    }, [])
  
    return (
      <AuthContext.Provider value={{ user, setUser, logout, loading }}>
        {children}
      </AuthContext.Provider>
    )
  }

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
