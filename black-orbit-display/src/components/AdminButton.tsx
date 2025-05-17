import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const AdminButton = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check if user is authenticated as admin
        const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
        setIsAdmin(isAuthenticated);

        // Always show for demo purposes, in production you might want different logic
        setIsVisible(true);

        // Add a scroll listener
        const handleScroll = () => {
            // Show button after scrolling a bit
            setIsVisible(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = () => {
        if (isAdmin) {
            navigate("/admin/dashboard");
        } else {
            navigate("/admin");
        }
    };

    if (!isVisible) return null;

    return (
        <Button
            variant="outline"
            size="icon"
            className={cn(
                "fixed bottom-6 right-6 z-50 rounded-full h-12 w-12 bg-white/10 backdrop-blur-sm border-white/20 shadow-lg transition-all duration-300",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            )}
            onClick={handleClick}
        >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Admin Panel</span>
        </Button>
    );
};

export default AdminButton; 