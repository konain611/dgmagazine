'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import Link from 'next/link';

interface LikeItem {
  article: { id: string; title: string; slug: string };
  createdAt: string;
}

export default function LikesPage() {
  const { token } = useAuth();
  const [likes, setLikes] = useState<LikeItem[]>([]);

  useEffect(() => {
    if (!token) return;
    fetch('/api/user/likes', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => setLikes(data.likes));
  }, [token]);

  return (
    <div>
      <h1 className="text-2xl mb-4">Articles You Liked</h1>
      {likes.length ? (
        likes.map((l) => (
          <Link key={l.article.id} href={`/articles/${l.article.slug}`}>
            <div className="p-4 mb-2 border rounded hover:bg-gray-50">
              <h2 className="font-semibold">{l.article.title}</h2>
              <p className="text-sm text-gray-500">
                Liked on {new Date(l.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p>You haven&apos;t liked any articles yet.</p>
      )}
    </div>
  );
}