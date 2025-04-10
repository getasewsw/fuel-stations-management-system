import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        comments: true,
      },
    })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const post = await prisma.post.create({
      data: {
        title: body.title,
        body: body.body,
        author: body.author,
        date: body.date,
        comments: {
          create: body.comments?.map((comment: any) => ({
            text: comment.text,
            username: comment.username,
          })),
        },
      },
      include: {
        comments: true,
      },
    })
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 })
  }
} 