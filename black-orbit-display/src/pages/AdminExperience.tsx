import { useState } from "react";
import AdminSection from "@/components/AdminSection";
import { sectionSchemas } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface ExperienceItemProps {
    item: any;
    onEdit: (item: any) => void;
    onDelete: (id: string) => void;
}

const ExperienceItem = ({ item, onEdit, onDelete }: ExperienceItemProps) => {
    return (
        <Card className="bg-black/20 border-white/10 text-white overflow-hidden transition-all hover:translate-y-[-5px] h-full">
            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-lg">{item.role}</h3>
                        <p className="text-white/60">{item.company}</p>
                    </div>
                    <div className="text-sm text-white/60">{item.duration}</div>
                </div>
                <div className="space-y-2 mb-4">
                    {item.responsibilities && item.responsibilities.map((responsibility: string, index: number) => (
                        <p key={index} className="text-sm text-white/80">• {responsibility}</p>
                    ))}
                </div>
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

const AdminExperience = () => {
    return (
        <AdminSection
            title="Experience"
            description="Manage your work experience and professional history."
            schema={sectionSchemas.experience}
            itemComponent={ExperienceItem}
        />
    );
};

export default AdminExperience; 