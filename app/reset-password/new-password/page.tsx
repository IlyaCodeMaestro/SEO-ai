"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AuthInput from "@/components/auth-input"
import { useAuth } from "@/components/auth-provider"

export default function NewPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const router = useRouter()
  const { setNewPassword } = useAuth()

  useEffect(() => {
    // Get email from previous step
    const storedEmail = sessionStorage.getItem("resetEmail")
    if (!storedEmail) {
      router.push("/reset-password")
      return
    }

    setEmail(storedEmail)
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!password || !confirmPassword) {
      setError("Пожалуйста, заполните все поля")
      return
    }

    if (password !== confirmPassword) {
      setError("Пароли не совпадают")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const success = await setNewPassword(password, confirmPassword)
      if (success) {
        // Clear reset email
        sessionStorage.removeItem("resetEmail")
        router.push("/login")
      } else {
        setError("Не удалось обновить пароль")
      }
    } catch (err) {
      setError("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-medium">Восстановление пароля</h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <AuthInput
              icon="lock"
              type="password"
              placeholder="Новый пароль"
              showPasswordToggle
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <AuthInput
              icon="lock"
              type="password"
              placeholder="Повторите пароль"
              showPasswordToggle
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              {isLoading ? "Загрузка..." : "Войти"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
