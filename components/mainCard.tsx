"use client";

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { ThumbsDownIcon, ThumbsUpIcon } from "./icons";
import Image from 'next/image';
import { useAuth } from './AuthContext';

interface NewsCardProps {
  articleId: number;
  imageSrc: string;
  title: string;
  author: string;
  shortDescription: string;
  publishDate: Date;
  views: number;
  commentsCount: number;
  likesCount: number;
  href: string;
}

export default function NewsCard({
  articleId,
  imageSrc,
  title,
  author,
  shortDescription,
  publishDate,
  views,
  commentsCount,
  likesCount,
  href,
}: NewsCardProps) {
  const { token } = useAuth();
  const [likes, setLikes] = useState(likesCount);
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(null);
  const timeAgo = formatDistanceToNow(publishDate, { addSuffix: true });

  const handleReaction = async (type: "like" | "dislike") => {
    if (!token) return alert(`Please login to ${type}.`);

    try {
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
        setUserReaction(data.reaction);
      }
    } catch (error) {
      console.error("Failed to update reaction:", error);
    }
  };

  const handleLike = () => handleReaction("like");
  const handleDislike = () => handleReaction("dislike");

  return (
    <div className="mb-10 w-full bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow relative rounded-lg border border-gray-200">
      {/* Clickable Image */}
     <Link href={href} className="block relative h-72 overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          width={800}  // Increased width for better quality
          height={550} // Maintain aspect ratio (16:9)
          className="w-full h-full object-cover hover:opacity-90 transition-opacity"
          style={{
            objectPosition: 'center' // Ensure the focus is centered
          }}
          priority={false} // Optional: set to true for above-the-fold images
        />
      </Link>

      {/* Content below image */}
      <div className="p-4">
        {/* Clickable Title */}
        <Link href={href} className="text-gray-900 text-2xl font-bold hover:text-[#FF9120] line-clamp-2 mb-4 block">
          {title}
        </Link>

        {/* Author */}
        <div className="mt-1 text-sm text-gray-500">
          Written by <span className="font-medium text-[#003366] underline cursor-pointer hover:text-[#FF9120]">{author}</span>
        </div>

        {/* Short Description */}
        <p className="mt-2 text-gray-600 line-clamp-3">
          {shortDescription}
        </p>

        {/* Meta information */}
        <div className="mt-3 flex items-center gap-3 text-xs text-gray-500 mb-4">
          <span>{timeAgo}</span>
          <span>•</span>
          <span>{views} views</span>
          <span>•</span>
          <span>{commentsCount} Comments</span>
        </div>

        {/* Like/Dislike buttons */}
        <div className="mt-3 flex gap-4 items-center">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 hover:text-green-600 text-sm"
          >
            <ThumbsUpIcon className={`w-8 h-8 ${userReaction === "like" ? "fill-current" : ""}`} />
            {likes}
          </button>

          <button
            onClick={handleDislike}
            className="flex items-center gap-1 hover:text-red-600 text-sm"
          >
            <ThumbsDownIcon className={`w-8 h-8 ${userReaction === "dislike" ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Continue Reading Button */}
        <Link
          href={href}
          className="absolute bottom-4 right-4 text-sm font-medium text-[#FF9120] hover:text-[#e07d1a] flex items-center"
        >
          CONTINUE READING
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}