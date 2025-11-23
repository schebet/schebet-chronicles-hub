import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { CommentForm } from "./CommentForm";
import { CommentItem, Comment } from "./CommentItem";

interface CommentsProps {
  postId: string;
}

export const Comments = ({ postId }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toLocaleDateString('sr-RS', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const addComment = (author: string, content: string) => {
    const newComment: Comment = {
      id: generateId(),
      author,
      content,
      timestamp: getCurrentTimestamp(),
      likes: 0,
      replies: []
    };
    setComments([newComment, ...comments]);
  };

  const addReply = (parentId: string, author: string, content: string) => {
    const addReplyToComment = (comments: Comment[]): Comment[] => {
      return comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: generateId(),
                author,
                content,
                timestamp: getCurrentTimestamp(),
                likes: 0,
                replies: []
              }
            ]
          };
        }
        if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: addReplyToComment(comment.replies)
          };
        }
        return comment;
      });
    };
    setComments(addReplyToComment(comments));
  };

  const toggleLike = (commentId: string) => {
    const updateLikes = (comments: Comment[]): Comment[] => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 };
        }
        if (comment.replies.length > 0) {
          return { ...comment, replies: updateLikes(comment.replies) };
        }
        return comment;
      });
    };
    setComments(updateLikes(comments));
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <MessageCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">
            Komentari ({comments.length})
          </h2>
        </div>

        <div className="mb-8 bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-border/40">
          <h3 className="text-lg font-semibold mb-4">Ostavite komentar</h3>
          <CommentForm onSubmit={addComment} />
        </div>

        {comments.length === 0 ? (
          <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed border-border">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-muted-foreground">
              Budite prvi koji će komentarisati ovaj članak
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onReply={addReply}
                onLike={toggleLike}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
