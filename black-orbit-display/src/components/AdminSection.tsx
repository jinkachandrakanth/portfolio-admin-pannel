import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import {
    Pencil,
    Trash2,
    Plus,
    Search,
    AlertTriangle,
    ArrowLeft
} from "lucide-react";
import { Input } from "@/components/ui/input";
import AdminNavbar from "./AdminNavbar";
import DynamicForm from "./DynamicForm";
import ParticleBackground from "./ParticleBackground";
import { generateId } from "@/lib/utils";
import axios from 'axios';

interface AdminSectionProps {
    title: string;
    description: string;
    schema: Record<string, any>;
    initialData?: any[];
    itemComponent: React.ComponentType<{ item: any; onEdit: (item: any) => void; onDelete: (id: string) => void; }>;
}

const API_BASE = '/api';

// Add axios default configuration
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

const AdminSection = ({
    title,
    description,
    schema,
    initialData = [],
    itemComponent: ItemComponent
}: AdminSectionProps) => {
    const navigate = useNavigate();
    const [items, setItems] = useState<any[]>(initialData);
    const [filteredItems, setFilteredItems] = useState<any[]>(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    useEffect(() => {
        // Check if user is authenticated
        const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
        if (!isAuthenticated) {
            navigate("/admin");
            return;
        }

        // Fetch data from backend based on section
        setIsLoading(true);
        const endpoint = title.toLowerCase();
        axios.get(`${API_BASE}/${endpoint}`)
            .then(res => {
                setItems(res.data);
                setFilteredItems(res.data);
            })
            .catch(() => toast.error(`Failed to fetch ${title.toLowerCase()}`))
            .finally(() => setIsLoading(false));
    }, [navigate, title]);

    useEffect(() => {
        // Filter items based on search term
        if (!searchTerm.trim()) {
            setFilteredItems(items);
            return;
        }

        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filtered = items.filter(item => {
            // Search in all string properties
            return Object.entries(item).some(([key, value]) => {
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(lowerCaseSearchTerm);
                }
                if (Array.isArray(value)) {
                    return value.some(v =>
                        typeof v === 'string' && v.toLowerCase().includes(lowerCaseSearchTerm)
                    );
                }
                return false;
            });
        });

        setFilteredItems(filtered);
    }, [items, searchTerm]);

    const handleLogout = () => {
        localStorage.removeItem("adminAuthenticated");
        localStorage.removeItem("adminToken");
        toast.success("Logged out successfully");
        navigate("/admin");
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleAdd = async (newItem: any) => {
        const endpoint = title.toLowerCase();
        try {
            const res = await axios.post(`${API_BASE}/${endpoint}`, newItem);
            setItems([...items, res.data]);
            setFilteredItems([...items, res.data]);
            setIsAddDialogOpen(false);
            toast.success(`${title.slice(0, -1)} added successfully`);
        } catch {
            toast.error(`Failed to add ${title.toLowerCase().slice(0, -1)}`);
        }
    };

    const handleEdit = async (updatedItem: any) => {
        const endpoint = title.toLowerCase();
        try {
            const res = await axios.put(`${API_BASE}/${endpoint}/${updatedItem._id}`, updatedItem);
            const updatedItems = items.map(item => item._id === updatedItem._id ? res.data : item);
            setItems(updatedItems);
            setFilteredItems(updatedItems);
            setIsEditDialogOpen(false);
            setSelectedItem(null);
            toast.success(`${title.slice(0, -1)} updated successfully`);
        } catch {
            toast.error(`Failed to update ${title.toLowerCase().slice(0, -1)}`);
        }
    };

    const handleDelete = async (id: string) => {
        const endpoint = title.toLowerCase();
        try {
            await axios.delete(`${API_BASE}/${endpoint}/${id}`);
            const filtered = items.filter(item => item._id !== id);
            setItems(filtered);
            setFilteredItems(filtered);
            setIsDeleteDialogOpen(false);
            setSelectedItem(null);
            toast.success(`${title.slice(0, -1)} deleted successfully`);
        } catch {
            toast.error(`Failed to delete ${title.toLowerCase().slice(0, -1)}`);
        }
    };

    const openEditDialog = (item: any) => {
        setSelectedItem(item);
        setIsEditDialogOpen(true);
    };

    const openDeleteDialog = (item: any) => {
        setSelectedItem(item);
        setIsDeleteDialogOpen(true);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <ParticleBackground />
            <AdminNavbar onLogout={handleLogout} />

            <main className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate("/admin/dashboard")}
                                className="hover:bg-white/10"
                            >
                                <ArrowLeft size={18} />
                            </Button>
                            <h1 className="text-3xl font-bold">{title}</h1>
                        </div>
                        <p className="text-white/60 mt-1">{description}</p>
                    </div>

                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2">
                                <Plus size={16} />
                                <span>Add {title.slice(0, -1)}</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-black/90 backdrop-blur-lg border-white/10 text-white">
                            <DialogHeader>
                                <DialogTitle>Add New {title.slice(0, -1)}</DialogTitle>
                                <DialogDescription className="text-white/60">
                                    Fill in the details to add a new {title.toLowerCase().slice(0, -1)} to your portfolio.
                                </DialogDescription>
                            </DialogHeader>
                            <DynamicForm
                                schema={schema}
                                onSubmit={handleAdd}
                                submitText={`Add ${title.slice(0, -1)}`}
                            />
                        </DialogContent>
                    </Dialog>
                </div>

                <Card className="bg-black/30 border-white/10 text-white mb-6">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Search size={18} className="text-white/60" />
                            <Input
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder={`Search ${title.toLowerCase()}...`}
                                className="bg-white/10 border-white/20"
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {isLoading ? (
                        <p className="col-span-full text-center py-10">Loading {title.toLowerCase()}...</p>
                    ) : filteredItems.length === 0 ? (
                        <div className="col-span-full text-center py-10">
                            {searchTerm ? (
                                <p className="text-white/60">No {title.toLowerCase()} found matching your search criteria.</p>
                            ) : (
                                <div className="space-y-3">
                                    <p className="text-white/60">No {title.toLowerCase()} found. Add your first one!</p>
                                    <Button
                                        onClick={() => setIsAddDialogOpen(true)}
                                        className="flex items-center gap-2"
                                    >
                                        <Plus size={16} />
                                        <span>Add {title.slice(0, -1)}</span>
                                    </Button>
                                </div>
                            )}
                        </div>
                    ) : (
                        filteredItems.map(item => (
                            <div key={item.id} className="relative group">
                                <ItemComponent
                                    item={item}
                                    onEdit={openEditDialog}
                                    onDelete={openDeleteDialog}
                                />
                            </div>
                        ))
                    )}
                </div>
            </main>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="bg-black/90 backdrop-blur-lg border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle>Edit {title.slice(0, -1)}</DialogTitle>
                        <DialogDescription className="text-white/60">
                            Make changes to the {title.toLowerCase().slice(0, -1)} details.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedItem && (
                        <DynamicForm
                            schema={schema}
                            initialData={selectedItem}
                            onSubmit={handleEdit}
                            submitText={`Update ${title.slice(0, -1)}`}
                            isEditing={true}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="bg-black/90 backdrop-blur-lg border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-500">
                            <AlertTriangle size={18} />
                            <span>Confirm Deletion</span>
                        </DialogTitle>
                        <DialogDescription className="text-white/60">
                            Are you sure you want to delete this {title.toLowerCase().slice(0, -1)}? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-3 mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            className="border-white/10 hover:bg-white/10"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => selectedItem && handleDelete(selectedItem.id)}
                            className="flex items-center gap-2"
                        >
                            <Trash2 size={16} />
                            <span>Delete</span>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminSection; 