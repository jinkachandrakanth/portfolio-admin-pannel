import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Lock } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a production environment, this would be a real API call
      // For demo purposes, we'll use a hardcoded check
      if (credentials.username === "admin" && credentials.password === "password") {
        // Store authentication status in localStorage
        localStorage.setItem("adminAuthenticated", "true");
        localStorage.setItem("adminToken", "demo-jwt-token");

        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <ParticleBackground />

      <Card className="w-full max-w-md bg-black/50 backdrop-blur-md border border-white/10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription className="text-white/70">
            Login to manage your portfolio content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                className="bg-white/10 border-white/20"
                required
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                className="bg-white/10 border-white/20"
                required
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-white/50">
            <div className="flex items-center justify-center gap-2">
              <Lock size={14} />
              <span>Secure admin area</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
