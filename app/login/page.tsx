"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AuthInput from "@/components/auth-input"
import { useAuth } from "@/components/auth-provider"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) {
      setError("Пожалуйста, заполните все поля")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const success = await login(username, password)
      if (success) {
        router.push("/")
      } else {
        setError("Неверный логин или пароль")
      }
    } catch (err) {
      setError("Произошла ошибка при входе")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-medium">Вход</h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <AuthInput
              icon="user"
              type="text"
              placeholder="Логин или Электронная почта"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <AuthInput
              icon="lock"
              type="password"
              placeholder="Пароль"
              showPasswordToggle
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <div className="text-center">
            <Link href="/reset-password" className="text-sm text-gray-600 hover:text-gray-900">
              Забыли пароль?
            </Link>
          </div>
        </form>

        <div className="mt-16 text-center">
          <Link
            href="/register"
            className="inline-flex justify-center py-3 px-6 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  )
}
