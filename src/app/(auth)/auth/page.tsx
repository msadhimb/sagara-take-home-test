import { Suspense } from "react"
import AuthView from "@/view/Auth"

export const metadata = {
  title: "Sign In | Sagara",
  description: "Sign in or create your account to book your room.",
}

const AuthPage = () => {
  return (
    <Suspense fallback={null}>
      <AuthView />
    </Suspense>
  )
}

export default AuthPage
