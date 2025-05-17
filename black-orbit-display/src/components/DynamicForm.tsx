import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tag, TagInput as UITagInput } from "@/components/ui/tag-input";
import { generateId } from "@/lib/utils";
import { Plus, X, Save, ArrowRight } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface FormField {
    name: string;
    type: string;
    label: string;
    required: boolean;
    value: any;
}

interface DynamicFormProps {
    schema: Record<string, any>;
    initialData?: Record<string, any>;
    onSubmit: (data: any) => void;
    submitText?: string;
    isEditing?: boolean;
}

// Custom tag input component for the form
const CustomTagInput = ({ value, onChange }: any) => {
    const [tags, setTags] = useState<string[]>(value || []);
    const [inputValue, setInputValue] = useState("");

    const handleAddTag = () => {
        if (inputValue.trim() !== "" && !tags.includes(inputValue.trim())) {
            const newTags = [...tags, inputValue.trim()];
            setTags(newTags);
            onChange(newTags);
            setInputValue("");
        }
    };

    const handleRemoveTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
        onChange(newTags);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddTag();
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex gap-2">
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add item and press Enter"
                    className="bg-white/10 border-white/20"
                />
                <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={handleAddTag}
                    className="border-white/20 hover:bg-white/10"
                >
                    <Plus size={16} />
                </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="bg-white/10 text-white px-3 py-1 rounded-full text-sm flex items-center"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => handleRemoveTag(index)}
                            className="ml-2 text-white/70 hover:text-white"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Mock image upload component
const ImageUpload = ({ value, onChange }: any) => {
    const [imageUrl, setImageUrl] = useState(value || "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageUrl(e.target.value);
        onChange(e.target.value);
    };

    return (
        <div className="space-y-2">
            <Input
                type="text"
                value={imageUrl}
                onChange={handleChange}
                placeholder="Enter image URL"
                className="bg-white/10 border-white/20"
            />
            {imageUrl && (
                <div className="mt-2 relative overflow-hidden rounded-md aspect-video bg-white/5">
                    <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=Invalid+Image+URL";
                        }}
                    />
                </div>
            )}
        </div>
    );
};

const DynamicForm = ({
    schema,
    initialData = {},
    onSubmit,
    submitText = "Save",
    isEditing = false
}: DynamicFormProps) => {
    // Generate form fields from schema
    const generateFormFields = (): FormField[] => {
        return Object.entries(schema).map(([key, config]: [string, any]) => {
            return {
                name: key,
                ...config,
                value: initialData[key] !== undefined
                    ? initialData[key]
                    : (config.type === 'array' ? [] : config.type === 'boolean' ? false : '')
            };
        });
    };

    const [fields, setFields] = useState<FormField[]>(generateFormFields());
    const [formData, setFormData] = useState(initialData || {});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Reset form when schema or initialData changes
        setFields(generateFormFields());
        setFormData(initialData || {});
    }, [schema, initialData]);

    const handleChange = (name: string, value: any) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Validate required fields
            const missingRequiredFields = fields
                .filter(field => field.required &&
                    (formData[field.name] === undefined ||
                        formData[field.name] === "" ||
                        (Array.isArray(formData[field.name]) && formData[field.name].length === 0)))
                .map(field => field.label);

            if (missingRequiredFields.length > 0) {
                toast.error(`Please fill in the following required fields: ${missingRequiredFields.join(", ")}`);
                setIsSubmitting(false);
                return;
            }

            // If all validation passes, add an ID if not editing
            const dataToSubmit = {
                ...(isEditing ? {} : { id: generateId() }),
                ...formData
            };

            // Submit form data
            await onSubmit(dataToSubmit);
            toast.success(`${isEditing ? "Updated" : "Created"} successfully!`);

            // Reset form if not editing
            if (!isEditing) {
                setFormData({});
            }
        } catch (error) {
            console.error("Form submission error:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Render a form field based on its type
    const renderField = (field: FormField) => {
        const { name, type, label, value } = field;

        switch (type) {
            case "text":
                return (
                    <Textarea
                        id={name}
                        name={name}
                        value={formData[name] || ""}
                        onChange={(e) => handleChange(name, e.target.value)}
                        placeholder={`Enter ${label.toLowerCase()}`}
                        className="bg-white/10 border-white/20 min-h-[100px]"
                    />
                );

            case "array":
                return (
                    <CustomTagInput
                        value={formData[name] || []}
                        onChange={(value: string[]) => handleChange(name, value)}
                    />
                );

            case "boolean":
                return (
                    <Switch
                        id={name}
                        checked={formData[name] || false}
                        onCheckedChange={(checked) => handleChange(name, checked)}
                    />
                );

            case "image":
                return (
                    <ImageUpload
                        value={formData[name] || ""}
                        onChange={(value: string) => handleChange(name, value)}
                    />
                );

            case "string":
            default:
                return (
                    <Input
                        id={name}
                        name={name}
                        type="text"
                        value={formData[name] || ""}
                        onChange={(e) => handleChange(name, e.target.value)}
                        placeholder={`Enter ${label.toLowerCase()}`}
                        className="bg-white/10 border-white/20"
                    />
                );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field) => (
                <div key={field.name} className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor={field.name} className="font-medium">
                            {field.label}
                        </Label>
                        {field.required && <span className="text-red-500">*</span>}
                    </div>
                    {renderField(field)}
                </div>
            ))}

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
            >
                {isSubmitting ? (
                    <span className="flex items-center gap-2">Processing...</span>
                ) : (
                    <span className="flex items-center gap-2">
                        {isEditing ? <Save size={16} /> : <Plus size={16} />}
                        {submitText}
                    </span>
                )}
            </Button>
        </form>
    );
};

export default DynamicForm; 