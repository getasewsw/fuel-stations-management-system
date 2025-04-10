'use client';

import React from 'react';
import PostForm from '@/components/posts/PostForm';

export default function CreatePostPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <PostForm />
    </div>
  );
} 