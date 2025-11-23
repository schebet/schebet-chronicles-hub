import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CommentFormProps {
  onSubmit: (author: string, content: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  submitLabel?: string;
}

export const CommentForm = ({ onSubmit, onCancel, placeholder = "Napišite komentar...", submitLabel = "Objavi" }: CommentFormProps) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (author.trim() && content.trim()) {
      onSubmit(author.trim(), content.trim());
      setAuthor("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="author" className="text-sm font-medium">Ime</Label>
        <Input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Vaše ime"
          required
          maxLength={50}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="comment" className="text-sm font-medium">Komentar</Label>
        <Textarea
          id="comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          required
          maxLength={500}
          className="mt-1 min-h-[100px]"
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={!author.trim() || !content.trim()}>
          {submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Otkaži
          </Button>
        )}
      </div>
    </form>
  );
};
