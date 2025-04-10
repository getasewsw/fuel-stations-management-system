'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Post } from '@/types/posts';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ViewPostPage() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${params.id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="flex gap-2">
          <Link href={`/posts/${post.id}/edit`}>
            <Button variant="outline">Edit</Button>
          </Link>
          <Link href="/posts">
            <Button variant="outline">Back to Posts</Button>
          </Link>
        </div>
      </div>
      
      <div className="prose max-w-none">
        <div className="text-sm text-muted-foreground mb-4">
          By {post.author} on {new Date(post.date).toLocaleDateString()}
        </div>
        <p className="whitespace-pre-wrap">{post.body}</p>
        
        {post.comments && post.comments.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            <div className="space-y-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="border rounded-lg p-4">
                  <div className="font-medium">{comment.username}</div>
                  <p className="text-muted-foreground">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 