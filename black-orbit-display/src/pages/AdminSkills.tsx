// Removed MongoDB-related code
// This file should be used for server-side MongoDB operations only

import { useState, useEffect } from "react";
import AdminSection from "@/components/AdminSection";
import { sectionSchemas } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";

interface SkillItemProps {
  item: any;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

const SkillItem = ({ item, onEdit, onDelete }: SkillItemProps) => {
  return (
    <Card className="bg-black/20 border-white/10 text-white overflow-hidden transition-all hover:translate-y-[-5px] h-full">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-lg">{item.category}</h3>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {item.skills && item.skills.map((skill: string, index: number) => (
            <Badge key={index} variant="outline" className="bg-white/5">
              {skill}
            </Badge>
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

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (newSkill) => {
    try {
      const response = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill),
      });
      if (response.ok) {
        fetchSkills();
      }
    } catch (error) {
      console.error('Error creating skill:', error);
    }
  };

  const handleUpdate = async (id, updatedSkill) => {
    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSkill),
      });
      if (response.ok) {
        fetchSkills();
      }
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchSkills();
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  return (
    <AdminSection
      title="Skills"
      description="Manage your technical skills and categories."
      schema={sectionSchemas.skills}
      itemComponent={SkillItem}
      items={skills}
      loading={loading}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
};

export default AdminSkills;
