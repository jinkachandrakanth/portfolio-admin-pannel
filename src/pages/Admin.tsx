import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { toast } from "../components/ui/sonner";
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
            // Simple authentication check
            if (credentials.username === "admin" && credentials.password === "admin123") {
                localStorage.setItem("adminAuthenticated", "true");
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
        <div className="min-h-screen bg-primary flex items-center justify-center px-4">
            <Card className="w-full max-w-md bg-tertiary border-white/10">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-textPrimary">Portfolio Admin</CardTitle>
                    <CardDescription className="text-textSecondary">
                        Login to manage your portfolio content
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-textPrimary">Username</label>
                            <Input
                                name="username"
                                value={credentials.username}
                                onChange={handleInputChange}
                                className="bg-white/10 border-white/20 text-textPrimary"
                                required
                                autoComplete="username"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-textPrimary">Password</label>
                            <Input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleInputChange}
                                className="bg-white/10 border-white/20 text-textPrimary"
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-secondary text-primary hover:bg-secondary/90"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-textSecondary">
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