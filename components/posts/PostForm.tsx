import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Post } from '@/types/posts';

interface PostFormProps {
  post?: Post;
  isEditing?: boolean;
}

function PostForm({ post, isEditing }: PostFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        body: post.body,
        author: post.author,
        date: post.date,
      });
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = isEditing ? `/api/posts/${post?.id}` : '/api/posts';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/posts');
        router.refresh();
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium mb-1">
          Content
        </label>
        <Textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          required
          rows={5}
        />
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium mb-1">
          Author
        </label>
        <Input
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium mb-1">
          Date
        </label>
        <Input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit">
          {isEditing ? 'Update Post' : 'Create Post'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default PostForm; 