// Removed MongoDB-related code
// This file should be used for server-side MongoDB operations only

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import AdminNavbar from "../components/AdminNavbar";
import axios from "axios";
import { mockData } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Clock,
  Star,
  Plus
} from "lucide-react";

// Type for section statistics
interface SectionStats {
  name: string;
  path: string;
  count: number;
  icon: JSX.Element;
  color: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<SectionStats[]>([]);
  const [recentItems, setRecentItems] = useState<any[]>([]);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/admin");
      return;
    }

    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        // In a real app, this would be an API call
        // For now, we'll fetch projects from the backend and use mock data for others
        const projectsResponse = await axios.get("/api/projects/");
        const projects = projectsResponse.data;

        const stats: SectionStats[] = [
          {
            name: "Projects",
            path: "/admin/projects",
            count: projects.length,
            icon: <Briefcase size={20} />,
            color: "from-purple-500 to-indigo-600"
          },
          // Keep mock data for other sections for now
 {
          },
          {
            name: "Skills",
            path: "/admin/skills",
            count: mockData.skills.length,
            icon: <Code size={20} />,
            color: "from-blue-500 to-cyan-600"
          },
          {
            name: "Education",
            path: "/admin/education",
            count: mockData.education.length,
            icon: <GraduationCap size={20} />,
            color: "from-green-500 to-emerald-600"
          },
          {
            name: "Experience",
            path: "/admin/experience",
            count: mockData.experience.length,
            icon: <Briefcase size={20} />,
            color: "from-yellow-500 to-orange-600"
          },
          {
            name: "Certifications",
            path: "/admin/certifications",
            count: mockData.certifications.length,
            icon: <Award size={20} />,
            color: "from-red-500 to-pink-600"
          }
        ];

        // Get recent items from all sections
        const getRecentItems = () => {
          const allItems = [
            ...projects.map((item: any) => ({ ...item, section: 'projects', path: '/admin/projects' })),
            ...mockData.skills.map(item => ({ ...item, section: 'skills', path: '/admin/skills' })),
            ...mockData.education.map(item => ({ ...item, section: 'education', path: '/admin/education' })),
            ...mockData.experience.map(item => ({ ...item, section: 'experience', path: '/admin/experience' })),
            ...mockData.certifications.map(item => ({ ...item, section: 'certifications', path: '/admin/certifications' }))
          ];

          // Sort by some criteria (in a real app, this would be creation date)
          // For now, we'll just return the first 5 items
          return allItems.slice(0, 5);
        };

        setStats(stats);
        setRecentItems(getRecentItems());
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  const getItemTitle = (item: any, section: string) => {
    switch (section) {
      case 'projects':
        return item.title;
      case 'skills':
        return item.category;
      case 'education':
        return item.degree;
      case 'experience':
        return item.role;
      case 'certifications':
        return item.title;
      default:
        return 'Untitled';
    }
  };

  const getItemDescription = (item: any, section: string) => {
    switch (section) {
      case 'projects':
        return item.description.substring(0, 100) + (item.description.length > 100 ? '...' : '');
      case 'skills':
        return `${item.skills.length} skills`;
      case 'education':
        return item.institution;
      case 'experience':
        return item.company;
      case 'certifications':
        return item.issuer;
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <ParticleBackground />
      <AdminNavbar onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold mb-0 animate-fade-in">Dashboard</h1>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("/", "_blank")}
              className="border-white/10 hover:bg-white/10"
            >
              View Site
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={stat.name}
              className="bg-black/30 border-white/10 text-white transition-all hover:translate-y-[-5px] cursor-pointer"
              onClick={() => navigate(stat.path)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-xs text-white/60">Total</p>
                    <h3 className="text-2xl font-bold">{stat.count}</h3>
                    <p className="text-sm">{stat.name}</p>
                  </div>
                  <div className={`rounded-full p-3 bg-gradient-to-br ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Items */}
        <Card className="bg-black/30 border-white/10 text-white mb-8">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Items</CardTitle>
                <CardDescription className="text-white/60">
                  Latest entries from all sections
                </CardDescription>
              </div>
              <Clock size={18} className="text-white/60" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center py-4">Loading recent items...</p>
            ) : recentItems.length === 0 ? (
              <p className="text-center py-4">No items found</p>
            ) : (
              <div className="space-y-4">
                {recentItems.map((item, index) => (
                  <div
                    key={`${item.section}-${item.id}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => navigate(item.path)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`rounded-full p-2 bg-gradient-to-br ${item.section === 'projects' ? 'from-purple-500 to-indigo-600' :
                          item.section === 'skills' ? 'from-blue-500 to-cyan-600' :
                            item.section === 'education' ? 'from-green-500 to-emerald-600' :
                              item.section === 'experience' ? 'from-yellow-500 to-orange-600' :
                                'from-red-500 to-pink-600'
                        }`}>
                        {item.section === 'projects' ? <Briefcase size={16} /> :
                          item.section === 'skills' ? <Code size={16} /> :
                            item.section === 'education' ? <GraduationCap size={16} /> :
                              item.section === 'experience' ? <Briefcase size={16} /> :
                                <Award size={16} />}
                      </div>
                      <div>
                        <h4 className="font-medium">{getItemTitle(item, item.section)}</h4>
                        <p className="text-sm text-white/60">{getItemDescription(item, item.section)}</p>
                      </div>
                    </div>
                    <div className="text-xs text-white/40 capitalize">{item.section}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Featured Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-black/30 border-white/10 text-white">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Featured Projects</CardTitle>
                  <CardDescription className="text-white/60">
                    Projects marked as featured
                  </CardDescription>
                </div>
                <Star size={18} className="text-white/60" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-center py-4">Loading projects...</p>
              ) : mockData.projects.filter(p => p.featured).length === 0 ? (
                <p className="text-center py-4">No featured projects found</p>
              ) : (
                <div className="space-y-3">
                  {mockData.projects.filter(p => p.featured).map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                      onClick={() => navigate("/admin/projects")}
                    >
                      <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/100?text=No+Image";
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{project.title}</h4>
                        <p className="text-sm text-white/60 line-clamp-1">{project.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-white/10 text-white">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription className="text-white/60">
                    Add new content to your portfolio
                  </CardDescription>
                </div>
                <Plus size={18} className="text-white/60" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate("/admin/projects")}
                  className="h-auto py-3 border-white/10 hover:bg-white/10 justify-start"
                >
                  <div className="flex flex-col items-start text-left">
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} />
                      <span>Add Project</span>
                    </div>
                    <span className="text-xs text-white/60 mt-1">Create a new portfolio project</span>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => navigate("/admin/skills")}
                  className="h-auto py-3 border-white/10 hover:bg-white/10 justify-start"
                >
                  <div className="flex flex-col items-start text-left">
                    <div className="flex items-center gap-2">
                      <Code size={16} />
                      <span>Add Skills</span>
                    </div>
                    <span className="text-xs text-white/60 mt-1">Add new technical skills</span>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => navigate("/admin/experience")}
                  className="h-auto py-3 border-white/10 hover:bg-white/10 justify-start"
                >
                  <div className="flex flex-col items-start text-left">
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} />
                      <span>Add Experience</span>
                    </div>
                    <span className="text-xs text-white/60 mt-1">Add work experience</span>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => navigate("/admin/certifications")}
                  className="h-auto py-3 border-white/10 hover:bg-white/10 justify-start"
                >
                  <div className="flex flex-col items-start text-left">
                    <div className="flex items-center gap-2">
                      <Award size={16} />
                      <span>Add Certificate</span>
                    </div>
                    <span className="text-xs text-white/60 mt-1">Add new certification</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
