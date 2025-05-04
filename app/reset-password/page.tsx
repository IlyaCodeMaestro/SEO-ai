"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AuthInput from "@/components/auth-input"
import { useAuth } from "@/components/auth-provider"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [codeSent, setCodeSent] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { resetPassword, verifyCode } = useAuth()

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError("Пожалуйста, введите электронную почту")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const success = await resetPassword(email)
      if (success) {
        setCodeSent(true)
      } else {
        setError("Не удалось отправить код")
      }
    } catch (err) {
      setError("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!verificationCode) {
      setError("Пожалуйста, введите код подтверждения")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const success = await verifyCode(verificationCode)
      if (success) {
        // Store email for the next step
        sessionStorage.setItem("resetEmail", email)
        router.push("/reset-password/new-password")
      } else {
        setError("Неверный код подтверждения")
      }
    } catch (err) {
      setError("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-medium">Восстановление пароля</h2>
        </div>

        <form className="space-y-6" onSubmit={codeSent ? handleVerifyCode : handleSendCode}>
          <div>
            <AuthInput
              icon="mail"
              type="email"
              placeholder="Электронная почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={codeSent}
            />
          </div>

          {codeSent && (
            <>
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
            </>
          )}

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              {isLoading ? "Загрузка..." : "Продолжить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
