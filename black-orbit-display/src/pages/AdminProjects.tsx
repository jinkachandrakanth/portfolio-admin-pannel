import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSection from "@/components/AdminSection";
import { sectionSchemas, mockData } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, ExternalLink, Github, Star } from "lucide-react";

interface ProjectItemProps {
  item: any;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

// Create a component to display a project item
const ProjectItem = ({ item, onEdit, onDelete }: ProjectItemProps) => {
  return (
    <Card className="bg-black/20 border-white/10 text-white overflow-hidden transition-all hover:translate-y-[-5px] h-full">
      <div className="h-40 overflow-hidden relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=No+Image";
          }}
        />
        {item.featured && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-yellow-500/80 text-black font-medium flex items-center gap-1">
              <Star size={12} />
              <span>Featured</span>
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{item.title}</h3>
          <div className="text-sm text-white/60">{item.date}</div>
        </div>
        <p className="text-sm text-white/80 mb-3 line-clamp-2">{item.description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {item.tech && item.tech.map((tech: string, index: number) => (
            <Badge key={index} variant="outline" className="bg-white/5">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
          <div className="flex gap-2">
            {item.link && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(item.link, "_blank");
                }}
              >
                <ExternalLink size={16} />
              </Button>
            )}
          </div>
          <div className="flex gap-2">
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
        </div>
      </CardContent>
    </Card>
  );
};

const AdminProjects = () => {
  return (
    <AdminSection
      title="Projects"
      description="Manage your portfolio projects. Add, edit, or remove projects to showcase your work."
      schema={sectionSchemas.projects}
      initialData={mockData.projects}
      itemComponent={ProjectItem}
    />
  );
};

export default AdminProjects; 