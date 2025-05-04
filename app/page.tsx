import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"
import ProtectedRoute from "@/components/protected-route"

export default function Home() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen flex flex-col w-full overflow-x-hidden">
        <Header />
        <div className="flex-1 relative w-full">
          <Dashboard />
        </div>
      </main>
    </ProtectedRoute>
  )
}
