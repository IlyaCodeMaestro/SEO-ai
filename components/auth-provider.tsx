"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  phone: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => void
  resetPassword: (email: string) => Promise<boolean>
  verifyCode: (code: string) => Promise<boolean>
  setNewPassword: (password: string, confirmPassword: string) => Promise<boolean>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true)
      // Mock login - in a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, accept any username/password
      const mockUser = {
        id: "1",
        name: username,
        email: `${username}@example.com`,
        phone: "+7 999 123 45 67",
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: any) => {
    try {
      setIsLoading(true)
      // Mock registration - in a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, always succeed
      const mockUser = {
        id: "1",
        name: userData.name || "User",
        email: userData.email || "user@example.com",
        phone: userData.phone || "+7 999 123 45 67",
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true)
      // Mock password reset - in a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return true
    } catch (error) {
      console.error("Password reset error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const verifyCode = async (code: string) => {
    try {
      setIsLoading(true)
      // Mock code verification - in a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // For demo purposes, accept any code
      return true
    } catch (error) {
      console.error("Code verification error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const setNewPassword = async (password: string, confirmPassword: string) => {
    try {
      setIsLoading(true)
      // Mock setting new password - in a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return true
    } catch (error) {
      console.error("Set new password error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        resetPassword,
        verifyCode,
        setNewPassword,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
