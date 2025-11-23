import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";
import { CommentForm } from "./CommentForm";
import { cn } from "@/lib/utils";

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
}

interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: string, author: string, content: string) => void;
  onLike: (commentId: string) => void;
  depth?: number;
}

export const CommentItem = ({ comment, onReply, onLike, depth = 0 }: CommentItemProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(comment.id);
  };

  const handleReply = (author: string, content: string) => {
    onReply(comment.id, author, content);
    setShowReplyForm(false);
  };

  return (
    <div className={cn("space-y-3", depth > 0 && "ml-8 mt-4")}>
      <div className="bg-muted/30 rounded-lg p-4 border border-border/40">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="font-semibold text-sm">{comment.author}</p>
            <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed mb-3">{comment.content}</p>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={cn(
              "h-8 px-2 gap-1",
              isLiked && "text-red-500"
            )}
          >
            <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
            <span className="text-xs">{comment.likes + (isLiked ? 1 : 0)}</span>
          </Button>
          {depth < 2 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="h-8 px-2 gap-1"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">Odgovori</span>
            </Button>
          )}
        </div>
      </div>

      {showReplyForm && (
        <div className="ml-8">
          <CommentForm
            onSubmit={handleReply}
            onCancel={() => setShowReplyForm(false)}
            placeholder="Napišite odgovor..."
            submitLabel="Odgovori"
          />
        </div>
      )}

      {comment.replies.length > 0 && (
        <div className="space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onLike={onLike}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
