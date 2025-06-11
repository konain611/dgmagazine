'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import Link from 'next/link';

interface CommentItem {
  commentId: string;
  content: string;
  createdAt: string;
  article: { id: string; title: string; slug: string };
}

export default function CommentsPage() {
  const { token } = useAuth();
  const [comments, setComments] = useState<CommentItem[]>([]);

  useEffect(() => {
    if (!token) return;
    fetch('/api/user/comments', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => setComments(data.comments));
  }, [token]);

  return (
    <div>
      <h1 className="text-2xl mb-4">Your Comments</h1>
      {comments.length ? (
        comments.map((c) => (
          <div key={c.commentId} className="p-4 mb-2 border rounded">
            <Link href={`/articles/${c.article.slug}`}>
              <h2 className="font-semibold hover:underline">{c.article.title}</h2>
            </Link>
            <p className="mt-1">{c.content}</p>
            <p className="text-sm text-gray-500">
              Commented on {new Date(c.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p>You haven&apos;t commented on any articles yet.</p>
      )}
    </div>
  );
}