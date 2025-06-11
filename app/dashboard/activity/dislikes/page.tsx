'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import Link from 'next/link';

interface DislikeItem {
  article: { id: string; title: string; slug: string };
  createdAt: string;
}

export default function DislikesPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<DislikeItem[]>([]);

  useEffect(() => {
    if (!token) return;
    fetch('/api/user/dislikes', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => setItems(data.dislikes));
  }, [token]);

  return (
    <div>
      <h1 className="text-2xl mb-4">Articles You Disliked</h1>
      {items.length ? (
        items.map((l) => (
          <Link key={l.article.id} href={`/articles/${l.article.slug}`}>
            <div className="p-4 mb-2 border rounded hover:bg-gray-50">
              <h2 className="font-semibold">{l.article.title}</h2>
              <p className="text-sm text-gray-500">
                Disliked on {new Date(l.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p>You haven’t disliked any articles yet.</p>
      )}
    </div>
  );
}