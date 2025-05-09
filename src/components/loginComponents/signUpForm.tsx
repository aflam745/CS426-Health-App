import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function SignUpForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password || !dateOfBirth) {
      setError("Please fill in all required fields.");
      return;
    }
      
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
      
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
      
    try {
      const response = await fetch("http://localhost:4000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          phone: phone || undefined,
          date_of_birth: dateOfBirth,
        }),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <Card className="w-[360px] p-6 shadow-md">
        <CardContent className="space-y-4">
          <h1 className="text-xl font-bold text-center">Sign Up</h1>

          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input placeholder="Phone (optional)" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button className="w-full" onClick={handleSignup}>
            Sign Up
          </Button>

          <p className="text-sm text-center mt-2 text-muted-foreground">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="text-black underline">
              Log in
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
