import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  Code,
  GraduationCap,
  Award,
  Settings,
  LogOut
} from "lucide-react";

interface AdminNavbarProps {
  onLogout: () => void;
}

const AdminNavbar = ({ onLogout }: AdminNavbarProps) => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Projects", path: "/admin/projects", icon: <Briefcase size={18} /> },
    { name: "Skills", path: "/admin/skills", icon: <Code size={18} /> },
    { name: "Education", path: "/admin/education", icon: <GraduationCap size={18} /> },
    { name: "Experience", path: "/admin/experience", icon: <Briefcase size={18} /> },
    { name: "Certifications", path: "/admin/certifications", icon: <Award size={18} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={18} /> },
  ];

  return (
    <nav className="bg-black/50 backdrop-blur-md border-b border-white/10 py-3 px-6 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold">Portfolio Admin</span>
          </div>

          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile dropdown menu could be added here */}

          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="flex items-center gap-1 border-white/10 hover:bg-white/10"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
