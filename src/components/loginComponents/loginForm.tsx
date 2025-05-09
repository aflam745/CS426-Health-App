import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    const response = await fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/home");
    } else {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 relative">
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 p-2 rounded hover:bg-gray-200 transition"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <Card className="w-[360px] p-6 shadow-md">
        <CardContent className="space-y-4">
          <h1 className="text-xl font-bold text-center">Login</h1>
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button className="w-full" onClick={handleLogin}>
            Log In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
