"use client";

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { ThumbsDownIcon, ThumbsUpIcon } from "./icons";

interface NewsCardProps {
  imageSrc: string;
  title: string;
  author: string;
  shortDescription: string;
  publishDate: Date;
  views: number;
  commentsCount: number;
  href: string;
  initialLikes?: number;
  initialDislikes?: number;
}

export default function NewsCard({
  imageSrc,
  title,
  author,
  shortDescription,
  publishDate,
  views,
  commentsCount,
  href,
  initialLikes = 0,
  initialDislikes = 0
}: NewsCardProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const timeAgo = formatDistanceToNow(publishDate, { addSuffix: true });

  return (
    <div className="mb-10 w-full bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow relative rounded-lg border border-gray-200">
      {/* Clickable Image */}
      <Link href={href} className="block">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-auto object-cover mb-4 hover:opacity-95 transition-opacity"
        />
      </Link>

      {/* Content below image */}
      <div className="p-4">
        {/* Clickable Title */}
        <Link href={href} className="text-2xl font-bold hover:text-[#FF9120] line-clamp-2 mb-4 block">
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
            onClick={() => setLikes(l => l + 1)}
            className="flex items-center gap-1 hover:text-green-600 text-sm"
          >
            <ThumbsUpIcon className="w-8 h-8" />
            {likes}
          </button>

          <button
            onClick={() => setDislikes(d => d + 1)}
            className="flex items-center gap-1 hover:text-red-600 text-sm"
          >
            <ThumbsDownIcon className="w-8 h-8" />
            {dislikes}
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