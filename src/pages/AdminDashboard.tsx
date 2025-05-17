import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Briefcase, Code, GraduationCap, Award, Settings, LogOut } from "lucide-react";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is authenticated
        const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
        if (!isAuthenticated) {
            navigate("/admin");
            return;
        }
        setIsLoading(false);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("adminAuthenticated");
        toast.success("Logged out successfully");
        navigate("/admin");
    };

    const sections = [
        {
            name: "Projects",
            path: "/admin/projects",
            icon: <Briefcase size={20} />,
            color: "from-purple-500 to-indigo-600"
        },
        {
            name: "Skills",
            path: "/admin/skills",
            icon: <Code size={20} />,
            color: "from-blue-500 to-cyan-600"
        },
        {
            name: "Education",
            path: "/admin/education",
            icon: <GraduationCap size={20} />,
            color: "from-green-500 to-emerald-600"
        },
        {
            name: "Experience",
            path: "/admin/experience",
            icon: <Briefcase size={20} />,
            color: "from-yellow-500 to-orange-600"
        },
        {
            name: "Certifications",
            path: "/admin/certifications",
            icon: <Award size={20} />,
            color: "from-red-500 to-pink-600"
        }
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-textPrimary">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary">
            <nav className="bg-tertiary border-b border-white/10 py-4 px-6">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold text-textPrimary">Portfolio Admin</h1>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        className="text-textSecondary hover:text-textPrimary"
                    >
                        <LogOut size={16} className="mr-2" />
                        Logout
                    </Button>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sections.map((section) => (
                        <Card
                            key={section.name}
                            className="bg-tertiary border-white/10 hover:border-secondary/50 transition-colors cursor-pointer"
                            onClick={() => navigate(section.path)}
                        >
                            <CardHeader>
                                <CardTitle className="text-textPrimary flex items-center gap-2">
                                    {section.icon}
                                    {section.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={`h-2 rounded-full bg-gradient-to-r ${section.color}`} />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard; 