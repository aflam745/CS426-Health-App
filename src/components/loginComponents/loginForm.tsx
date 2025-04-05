import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function LoginForm() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/home")
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gray-50">
      <h1 className="text-3xl font-bold">Welcome to Health 2.0</h1>
      <p className="text-muted-foreground">Please log in or sign up to continue</p>
      <div className="flex gap-4">
        <Button onClick={handleLogin}>Login</Button>
        <Button variant="outline" onClick={handleLogin}>Sign Up</Button>
      </div>
    </div>
  )
}
