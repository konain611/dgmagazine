
'use client';

import { FC, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  ThumbsUp,
  ThumbsDown,
  Download,
  Share2,
  Edit2,
  Trash2,
  CornerDownLeft,
} from 'lucide-react';
import Link from 'next/link';

interface CommentType {
  id: number;
  content: string;
  user: { id: number; username: string };
  parentId: number | null;
  createdAt: string;
  replies: CommentType[];
}

interface Props {
  articleId: number;
  initialLikes: number;
  initialDislikes: number;
  comments: CommentType[];
}

const ArticleInteractionPanel: FC<Props> = ({
  articleId,
  initialLikes,
  comments: initialComments,
}) => {
  const { token, userId } = useAuth();
  const [likes, setLikes] = useState(initialLikes);
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(
    null
  );

  const [commentList, setCommentList] = useState<CommentType[]>(
    initialComments
  );
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/articles/${articleId}/comment`);
        if (response.ok) {
          const data = await response.json();
          setCommentList(data.comments);
        }
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    fetchComments();
  }, [articleId]);

  useEffect(() => {
    const fetchReaction = async () => {
      if (!token) return;

      try {
        const response = await fetch(`/api/articles/${articleId}/reaction`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const { reaction } = await response.json();
          setUserReaction(reaction);
        }
      } catch (error) {
        console.error('Failed to fetch user reaction:', error);
      }
    };

    fetchReaction();
  }, [articleId, token]);

  const handleReaction = async (type: 'like' | 'dislike') => {
    if (!token) return alert(`Please login to ${type}.`);

    const endpoint = type === 'like' ? 'like' : 'dislike';
    const response = await fetch(`/api/articles/${articleId}/${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      setLikes(data.likes);
      setUserReaction(data.reaction);
    }
  };

  const handleLike = () => handleReaction('like');
  const handleDislike = () => handleReaction('dislike');

  const handleDownload = async () => {
    if (!token) return alert('Please login to download this article.');

    try {
      const response = await fetch(`/api/articles/${articleId}/download`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to download');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      const contentDisposition =
        response.headers.get('content-disposition');
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const filename = filenameMatch
        ? filenameMatch[1]
        : `article-${articleId}.pdf`;

      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download article. Please try again.');
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Check out this article!', url });
    } else {
      await navigator.clipboard.writeText(url);
      alert('Article link copied to clipboard!');
    }
  };

  const handleCommentSubmit = async () => {
    if (!token) return alert('Please login to comment.');
    if (!commentText.trim()) return alert('Comment cannot be empty.');
    if (commentText.length > 1000) return alert('Comment is too long.');

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/articles/${articleId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: commentText }),
      });

      if (response.ok) {
        const data = await response.json();
        setCommentList([{ ...data.comment, replies: [] }, ...commentList]);
        setCommentText('');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to post comment');
      }
    } catch (error) {
      console.error('Comment submission error:', error);
      alert('Failed to post comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplySubmit = async (
    parentId: number,
    replyText: string,
    clearReplyInput: () => void
  ) => {
    if (!token) return alert('Please login to reply.');
    if (!replyText.trim()) return alert('Reply cannot be empty.');
    if (replyText.length > 1000) return alert('Reply is too long.');

    try {
      const response = await fetch(`/api/articles/${articleId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: replyText, parentId }),
      });

      if (response.ok) {
        const data = await response.json();
        setCommentList((prev) =>
          prev.map((comment) => {
            if (comment.id === parentId) {
              return {
                ...comment,
                replies: [
                  ...comment.replies,
                  { ...data.comment, replies: [] },
                ],
              };
            }
            return comment;
          })
        );
        clearReplyInput();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to post reply');
      }
    } catch (error) {
      console.error('Reply submission error:', error);
      alert('Failed to post reply. Please try again.');
    }
  };

  const handleEditSubmit = async (
    commentId: number,
    newText: string,
    clearEditMode: () => void
  ) => {
    if (!token) return alert('Please login to edit.');
    if (!newText.trim()) return alert('Content cannot be empty.');
    if (newText.length > 1000) return alert('Content is too long.');

    try {
      const response = await fetch(
        `/api/articles/${articleId}/comment/${commentId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newText }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCommentList((prev) =>
          prev.map((comment) => {
            if (comment.id === commentId) {
              return { ...comment, content: data.comment.content };
            }
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === commentId
                  ? { ...reply, content: data.comment.content }
                  : reply
              ),
            };
          })
        );
        clearEditMode();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to edit comment');
      }
    } catch (error) {
      console.error('Edit error:', error);
      alert('Failed to edit comment. Please try again.');
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!token) return alert('Please login to delete.');
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const response = await fetch(
        `/api/articles/${articleId}/comment/${commentId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        setCommentList((prev) =>
          prev
            .filter((comment) => comment.id !== commentId)
            .map((comment) => ({
              ...comment,
              replies: comment.replies.filter((r) => r.id !== commentId),
            }))
        );
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete comment');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete comment. Please try again.');
    }
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Reaction & Download/Share Buttons */}
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2 px-4 py-1 bg-gray-100 rounded-full">
          <button
            onClick={handleLike}
            className={`p-1 rounded-full hover:bg-gray-200 ${
              userReaction === 'like'
                ? 'text-gray-900'
                : 'text-gray-900 cursor-pointer'
            }`}
          >
            <ThumbsUp
              className={`w-6 h-6 ${
                userReaction === 'like' ? 'fill-current' : ''
              } cursor-pointer`}
              strokeWidth={1.5}
            />
          </button>
          <span className="text-sm font-medium">{likes}</span>
        </div>

        <div className="flex items-center gap-2 px-4 py-1 bg-gray-100 rounded-full">
          <button
            onClick={handleDislike}
            className={`p-1 rounded-full hover:bg-gray-200 ${
              userReaction === 'dislike'
                ? 'text-gray-900'
                : 'text-gray-900'
            }`}
          >
            <ThumbsDown
              className={`w-6 h-6 ${
                userReaction === 'dislike' ? 'fill-current' : ''
              } cursor-pointer`}
              strokeWidth={1.5}
            />
          </button>
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full cursor-pointer
             transition-all duration-300 ease-in-out
             hover:bg-gray-200 hover:scale-105 hover:shadow-md
             active:scale-95 active:bg-gray-300"
        >
          <Download size={25} className="transition-transform duration-300 hover:scale-110" />
          <span className="font-medium">Download PDF</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full cursor-pointer
             transition-all duration-300 ease-in-out
             hover:bg-gray-200 hover:scale-105 hover:shadow-md
             active:scale-95 active:bg-gray-300"
        >
          <Share2 size={25} /> &nbsp; Share
        </button>
      </div>

      {/* Comment Input */}
      <div className="space-y-4">
        {token ? (
          <div className="space-y-2">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full border p-2 rounded-md"
              rows={3}
              placeholder="Add your comment..."
              maxLength={1000}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {commentText.length}/1000 characters
              </span>
              <button
                onClick={handleCommentSubmit}
                disabled={isSubmitting || !commentText.trim()}
                className="bg-[#003366] text-white px-4 py-2 rounded hover:bg-[#FF9102] disabled:opacity-50"
              >
                {isSubmitting ? 'Posting...' : 'Submit Comment'}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 py-7">
            <Link
              href="/sign-up"
              className="font-semibold text-gray-600 hover:text-[#003366] hover:underline"
            >
              Login
            </Link>{' '}
            to post a comment.
          </p>
        )}

        {/* Comments & Replies List */}
        {commentList.length > 0 ? (
          <div className="space-y-6">
            {commentList.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                articleId={articleId}
                userId={userId}
                token={token}
                onReplySubmit={handleReplySubmit}
                onEditSubmit={handleEditSubmit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default ArticleInteractionPanel;

interface CommentItemProps {
  comment: CommentType;
  articleId: number;
  userId: number | null;
  token: string | null;
  onReplySubmit: (
    parentId: number,
    replyText: string,
    clearFn: () => void
  ) => void;
  onEditSubmit: (
    commentId: number,
    newText: string,
    clearFn: () => void
  ) => void;
  onDelete: (commentId: number) => void;
}

const CommentItem: FC<CommentItemProps> = ({
  comment,
  articleId,
  userId,
  token,
  onReplySubmit,
  onEditSubmit,
  onDelete,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);

  // Ensure replies is always an array
  const replies = comment.replies || [];

  const clearReply = () => {
    setReplyText('');
    setIsReplying(false);
  };

  const clearEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className={`pl-${comment.parentId ? '8' : '4'} border-l border-gray-300`}>
      <div className="space-y-1">
        {isEditing ? (
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full border p-2 rounded-md"
            rows={2}
            maxLength={1000}
          />
        ) : (
          <p className="text-sm text-gray-800">{comment.content}</p>
        )}
        <p className="text-xs text-gray-400">
          By <span className='font-bold'>{comment.user.username.toUpperCase()}</span> on{' '}
          {new Date(comment.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        <div className="flex gap-4 items-center text-gray-500 text-sm">
          {token && comment.parentId === null && (
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center gap-1 hover:text-gray-900"
            >
              <CornerDownLeft size={16} /> Reply
            </button>
          )}
          {token && userId === comment.user.id && (
            <>
              <button
                onClick={() => {
                  setIsEditing(!isEditing);
                  setEditText(comment.content);
                }}
                className="flex items-center gap-1 hover:text-gray-900"
              >
                <Edit2 size={16} /> Edit
              </button>
              <button
                onClick={() => onDelete(comment.id)}
                className="flex items-center gap-1 hover:text-gray-900"
              >
                <Trash2 size={16} /> Delete
              </button>
            </>
          )}
          {isEditing && token && userId === comment.user.id && (
            <button
              onClick={() => onEditSubmit(comment.id, editText, clearEdit)}
              className="bg-[#003366] text-white px-3 py-1 rounded hover:bg-[#FF9102] disabled:opacity-50 text-xs"
              disabled={!editText.trim() || editText.length > 1000}
            >
              Save
            </button>
          )}
        </div>
      </div>

      {isReplying && token && comment.parentId === null && (
        <div className="mt-2 ml-4 space-y-2">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full border p-2 rounded-md"
            rows={2}
            placeholder="Write a reply..."
            maxLength={1000}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={clearReply}
              className="text-gray-500 px-3 py-1 rounded hover:bg-gray-100 text-xs"
            >
              Cancel
            </button>
            <button
              onClick={() => onReplySubmit(comment.id, replyText, clearReply)}
              className="bg-[#003366] text-white px-3 py-1 rounded hover:bg-[#FF9102] disabled:opacity-50 text-xs"
              disabled={!replyText.trim() || replyText.length > 1000}
            >
              Reply
            </button>
          </div>
        </div>
      )}

      {replies.length > 0 && (
        <div className="mt-4 space-y-4 ml-6">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={{ ...reply, replies: reply.replies || [] }}
              articleId={articleId}
              userId={userId}
              token={token}
              onReplySubmit={onReplySubmit}
              onEditSubmit={onEditSubmit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
