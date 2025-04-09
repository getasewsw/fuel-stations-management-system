import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import Link from 'next/link';
import posts from '@/Data/posts';
import { Post } from '@/types/posts';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';

interface PostsTableProps {
  limit?: number;
  title?: string;
}

function PostsTable({ limit, title }: PostsTableProps) {
  const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const filteredPosts = limit ? sortedPosts.slice(0, limit) : sortedPosts;

  return (
    <div className="rounded-md border">
      <div className="p-4">
        <h2 className="text-2xl font-semibold tracking-tight">{title ? title : 'Fuel Prices'}</h2>
        <p className="text-sm text-muted-foreground">Manage and track fuel prices across stations</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Title</TableHead>
            <TableHead className="hidden md:table-cell">Author</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPosts.map((post: Post) => (
            <TableRow key={post.id} className="group">
              <TableCell className="font-medium">
                <Link href={`/posts/${post.id}`} className="hover:underline">
                  {post.title}
                </Link>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  {post.author}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {format(new Date(post.date), 'MMM dd, yyyy')}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/posts/edit/${post.id}`}>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <span className="sr-only">Edit</span>
                      Edit
                    </Button>
                  </Link>
                  <Link href={`/posts/delete/${post.id}`}>
                    <Button variant="destructive" size="sm" className="h-8 gap-1">
                      <span className="sr-only">Delete</span>
                      Delete
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default PostsTable;
