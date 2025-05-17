import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Interface for a tag
export interface Tag {
    id: string;
    text: string;
}

// Props for the Tag component
interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
    tag: Tag;
    disabled?: boolean;
    onDelete?: (id: string) => void;
}

// Props for the TagInput component
interface TagInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    tags: Tag[];
    setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
    maxTags?: number;
    disabled?: boolean;
    onTagAdd?: (tag: Tag) => void;
    onTagRemove?: (id: string) => void;
    validation?: (tag: string) => boolean;
    delimiter?: string;
    className?: string;
}

// Tag component representing a single tag
export const Tag = React.forwardRef<HTMLDivElement, TagProps>(
    ({ tag, disabled, onDelete, className, ...props }, ref) => {
        return (
            <Badge
                ref={ref}
                className={cn(
                    "flex items-center gap-1 rounded-full px-3 py-1 text-sm",
                    className
                )}
                {...props}
            >
                {tag.text}
                {!disabled && onDelete && (
                    <button
                        type="button"
                        onClick={() => onDelete(tag.id)}
                        className="ml-1 rounded-full p-0.5 hover:bg-white/20"
                    >
                        <X size={14} />
                        <span className="sr-only">Remove {tag.text}</span>
                    </button>
                )}
            </Badge>
        );
    }
);
Tag.displayName = "Tag";

// TagInput component
export const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
    (
        {
            placeholder = "Add item...",
            tags,
            setTags,
            maxTags,
            disabled,
            onTagAdd,
            onTagRemove,
            validation = () => true,
            delimiter = ",",
            className,
            ...props
        },
        ref
    ) => {
        const [inputValue, setInputValue] = React.useState("");

        // Generate a unique ID
        const generateId = () => {
            return Date.now().toString(36) + Math.random().toString(36).substring(2);
        };

        // Add a new tag
        const addTag = (text: string) => {
            const trimmedText = text.trim();
            if (
                trimmedText !== "" &&
                !tags.some((tag) => tag.text === trimmedText) &&
                validation(trimmedText) &&
                (!maxTags || tags.length < maxTags)
            ) {
                const newTag = { id: generateId(), text: trimmedText };
                setTags([...tags, newTag]);
                onTagAdd?.(newTag);
                return true;
            }
            return false;
        };

        // Remove a tag by ID
        const removeTag = (id: string) => {
            setTags(tags.filter((tag) => tag.id !== id));
            onTagRemove?.(id);
        };

        // Handle input change
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);

            // If the input contains a delimiter, add tags
            if (e.target.value.includes(delimiter)) {
                const values = e.target.value.split(delimiter);
                let lastValue = values.pop() || "";
                let shouldClearInput = false;

                values.forEach((value) => {
                    shouldClearInput = addTag(value) || shouldClearInput;
                });

                // Only clear input if at least one tag was added
                if (shouldClearInput) {
                    setInputValue(lastValue);
                } else {
                    setInputValue(e.target.value);
                }
            }
        };

        // Handle key down events
        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (
                (e.key === "Enter" || e.key === delimiter) &&
                inputValue.trim() !== ""
            ) {
                e.preventDefault();
                if (addTag(inputValue)) {
                    setInputValue("");
                }
            } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
                removeTag(tags[tags.length - 1].id);
            }
        };

        return (
            <div className={cn("flex flex-col gap-2", className)}>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Tag
                            key={tag.id}
                            tag={tag}
                            disabled={disabled}
                            onDelete={removeTag}
                        />
                    ))}
                    <input
                        ref={ref}
                        type="text"
                        placeholder={
                            maxTags && tags.length >= maxTags
                                ? `Maximum ${maxTags} tags`
                                : placeholder
                        }
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        disabled={disabled || (maxTags ? tags.length >= maxTags : false)}
                        className="flex-1 bg-transparent outline-none border-none focus:outline-none focus:ring-0 p-1 placeholder:text-white/30 disabled:cursor-not-allowed"
                        {...props}
                    />
                </div>
            </div>
        );
    }
);
TagInput.displayName = "TagInput"; 