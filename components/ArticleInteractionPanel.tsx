"use client"

import { FC, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { ThumbsUp, ThumbsDown, Download, Share2 } from 'lucide-react';
import Link from 'next/link';

interface Comment {
  id: number;
  content: string;
  user: { username: string };
  createdAt: string;
}

interface Props {
  articleId: number;
  initialLikes: number;
  initialDislikes: number;
  comments: Comment[];
}

const ArticleInteractionPanel: FC<Props> = ({
  articleId,
  initialLikes,
  // initialDislikes,
  comments,
}) => {
  const { token } = useAuth();
  const [likes, setLikes] = useState(initialLikes);
  // const [dislikes, setDislikes] = useState(initialDislikes);
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(null);
  const [commentList, setCommentList] = useState<Comment[]>(comments);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add this useEffect to fetch comments on mount
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
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const { reaction } = await response.json();
          setUserReaction(reaction);
        }
      } catch (error) {
        console.error("Failed to fetch user reaction:", error);
      }
    };

    fetchReaction();
  }, [articleId, token]);

  const handleReaction = async (type: "like" | "dislike") => {
    if (!token) return alert(`Please login to ${type}.`);

    const endpoint = type === "like" ? "like" : "dislike";
    const response = await fetch(`/api/articles/${articleId}/${endpoint}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      const data = await response.json();
      setLikes(data.likes);
      // setDislikes(data.dislikes);
      setUserReaction(data.reaction);
    }
  };

  const handleLike = () => handleReaction("like");
  const handleDislike = () => handleReaction("dislike");


  const handleDownload = async () => {
    if (!token) return alert("Please login to download this article.");

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

      // Get filename from content-disposition header or use default
      const contentDisposition = response.headers.get('content-disposition');
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const filename = filenameMatch ? filenameMatch[1] : `article-${articleId}.pdf`;

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
      navigator.share({ title: "Check out this article!", url });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Article link copied to clipboard!");
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
        setCommentList([data.comment, ...commentList]);
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

  return (
    <div className="mt-6 space-y-6">
      {/* Buttons */}
      <div className="flex gap-4 items-center">

        <div className="flex items-center gap-2 px-4 py-1 bg-gray-100 rounded-full">
          <button
            onClick={handleLike}
            className={`p-1 rounded-full hover:bg-gray-200 ${userReaction === "like" ? "text-gray-900" : "text-gray-900 cursor-pointer"
              }`}
          >
            <ThumbsUp
              className={`w-6 h-6 ${userReaction === "like" ? "fill-current" : ""} cursor-pointer`}
              strokeWidth={1.5}
            />
          </button>
          <span className="text-sm font-medium">{likes}</span>
        </div>

        <div className="flex items-center gap-2 px-4 py-1 bg-gray-100 rounded-full">
          <button
            onClick={handleDislike}
            className={`p-1 rounded-full hover:bg-gray-200 ${userReaction === "dislike" ? "text-gray-900" : "text-gray-900"
              }`}
          >
            <ThumbsDown
              className={`w-6 h-6 ${userReaction === "dislike" ? "fill-current" : ""} cursor-pointer`}
              strokeWidth={1.5}
            />
          </button>
          {/* <span className="text-sm font-medium">{dislikes}</span> */}
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
        <button onClick={handleShare}
         className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full cursor-pointer
             transition-all duration-300 ease-in-out
             hover:bg-gray-200 hover:scale-105 hover:shadow-md
             active:scale-95 active:bg-gray-300">
          <Share2 size={25} /> &nbsp; Share
        </button>
      </div>

      {/* Comment Box */}
      <div className="space-y-4">
        {/* Comment Form */}
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
          <p className="text-gray-500 py-7"><Link href="/sign-up" className='font-semibold text-gray-600 hover:text-[#003366] hover:underline'>Login</Link> to post a comment.</p>
        )}

        {/* Comments List */}
        {commentList.length > 0 ? (
          <div className="space-y-4">
            {commentList.map((comment) => (
              <div key={comment.id} className="border-b pb-4">
                <p className="text-sm text-gray-700">{comment.content}</p>
                <p className="text-xs text-gray-400 mt-1">
                  By {comment.user.username} on{' '}
                  {new Date(comment.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
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
