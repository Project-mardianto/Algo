import { useState } from "react";
import { Eye, EyeOff, Droplets } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
          <Droplets className="w-7 h-7 text-white" />
        </div>
        <span className="text-2xl font-bold text-gray-800">AirGalon</span>
      </div>

      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-gray-500 text-center mb-6">Sign in to your account</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded border-gray-300" />
              Remember me
            </label>
            <button type="button" className="text-sm text-orange-600 hover:underline">
              Forgot password?
            </button>
          </div>

          <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
            Sign In
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5 mr-2" />
              Facebook
            </Button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-orange-600 font-medium hover:underline"
          >
            Sign up
          </button>
        </p>
      </Card>
    </div>
  );
}
