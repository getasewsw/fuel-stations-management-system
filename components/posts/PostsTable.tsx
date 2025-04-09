import React from 'react'
import { Table, TableBody,TableCaption, TableCell, TableHeader, TableRow,TableHead  } from "@/components/ui/table";
import Link from 'next/link';
import posts from '@/Data/posts';
import {Post} from '@/types/posts';
import { Button } from '../ui/button';

interface PostsTableProps {
    limit?: number;
    title?: string;
}
function PostsTable( {limit, title }: PostsTableProps) {
    const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const filteredPosts = limit ? sortedPosts.slice(0, limit) : sortedPosts;
    
  return (

    <div className='mt-10'>
      <h2 className='text-2xl font-bold text-slate-600 dark:text-slate-300 mb-4'>{title ? title: 'Fuel Price //posts'}</h2>

      <Table>
        <TableCaption>A list of all posts</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className=''>Title</TableHead>
            <TableHead className='hidden md:table-cell'>Author</TableHead>
            <TableHead className='hidden md:table-cell '>Date</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
            
            </TableRow>

            </TableHeader>
            <TableBody>
            {filteredPosts.slice(0, limit).map((post: Post) => (
              <TableRow key={post.id} className='hover:bg-slate-200 dark:hover:bg-slate-700'>   
                <TableCell className='font-medium text-slate-600 dark:text-slate-300'>
                  <Link href={`/posts/${post.id}`}>
                    {post.title}
                  </Link>
                </TableCell>
                <TableCell className='hidden md:table-cell'>{post.author}</TableCell>
                <TableCell className='hidden md:table-cell'>{post.date}</TableCell>
                <TableCell>
                  <Link href={`/posts/edit/${post.id}`} className='text-blue-500 hover:text-blue-700'>
                   <Button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'> Edit </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/posts/delete/${post.id}`} className='text-red-500 hover:text-red-700'>
                   <Button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors'> Delete </Button>
                  </Link>
                </TableCell>
                
              </TableRow>
            ))}
            </TableBody>
      </Table>
      
    </div>
  )
}

export default PostsTable;
