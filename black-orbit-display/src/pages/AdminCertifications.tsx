import { useState, useEffect } from "react";
import AdminSection from "@/components/AdminSection";
import { sectionSchemas } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface CertificationItemProps {
    item: any;
    onEdit: (item: any) => void;
    onDelete: (id: string) => void;
}

const CertificationItem = ({ item, onEdit, onDelete }: CertificationItemProps) => {
    return (
        <Card className="bg-black/20 border-white/10 text-white overflow-hidden transition-all hover:translate-y-[-5px] h-full">
            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                </div>
                <p className="text-white/60">{item.issuer}</p>
                <p className="text-sm text-white/80">Issue Date: {item.issueDate}</p>
                {item.certificateLink && (
                    <a href={item.certificateLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                        View Certificate
                    </a>
                )}
                <div className="flex items-center justify-end gap-2 mt-auto pt-2 border-t border-white/10">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-white/10"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(item);
                        }}
                    >
                        <Pencil size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-red-500 hover:bg-red-500/10"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(item._id);
                        }}
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

const AdminCertifications = () => {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCertifications();
    }, []);

    const fetchCertifications = async () => {
        try {
            const response = await fetch('/api/certifications');
            const data = await response.json();
            setCertifications(data);
        } catch (error) {
            console.error('Error fetching certifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (newCertification) => {
        try {
            const response = await fetch('/api/certifications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCertification),
            });
            if (response.ok) {
                fetchCertifications();
            }
        } catch (error) {
            console.error('Error creating certification:', error);
        }
    };

    const handleUpdate = async (id, updatedCertification) => {
        try {
            const response = await fetch(`/api/certifications/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCertification),
            });
            if (response.ok) {
                fetchCertifications();
            }
        } catch (error) {
            console.error('Error updating certification:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/certifications/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchCertifications();
            }
        } catch (error) {
            console.error('Error deleting certification:', error);
        }
    };

    return (
        <AdminSection
            title="Certifications"
            description="Manage your certifications and achievements."
            schema={sectionSchemas.certifications}
            itemComponent={CertificationItem}
            items={certifications}
            loading={loading}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
        />
    );
};

export default AdminCertifications; 