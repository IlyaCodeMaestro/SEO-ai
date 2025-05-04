"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AuthInput from "@/components/auth-input"
import { useAuth } from "@/components/auth-provider"

export default function RegisterStep2Page() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [registerData, setRegisterData] = useState<any>(null)
  const router = useRouter()
  const { register } = useAuth()

  useEffect(() => {
    // Get data from previous step
    const storedData = sessionStorage.getItem("registerData")
    if (!storedData) {
      router.push("/register")
      return
    }

    setRegisterData(JSON.parse(storedData))
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password || !confirmPassword || !verificationCode) {
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
      const userData = {
        ...registerData,
        username,
        password,
      }

      const success = await register(userData)
      if (success) {
        // Clear registration data
        sessionStorage.removeItem("registerData")
        router.push("/")
      } else {
        setError("Ошибка при регистрации")
      }
    } catch (err) {
      setError("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  if (!registerData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-medium">Регистрация</h2>
        </div>

        <p className="text-center text-gray-600 mb-8">Заполните все поля, чтобы создать аккаунт</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
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

          <div>
            <AuthInput
              icon="lock"
              type="password"
              placeholder="Повторить пароль"
              showPasswordToggle
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <p className="text-sm text-gray-600 text-center">Код отправлен Вам на электронную почту</p>

          <div>
            <AuthInput
              icon="lock"
              type="text"
              placeholder="Код"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
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
              {isLoading ? "Загрузка..." : "Зарегистрироваться"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            У Вас уже есть аккаунт?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Войдите
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
