import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const posts = [
  {
    title: 'The Rise of Artificial Intelligence',
    body: 'Artificial Intelligence (AI) is revolutionizing various industries...',
    author: 'John Doe',
    date: '2024-05-01',
    comments: [
      { text: 'Great introduction!', username: 'Jane' },
      { text: 'Looking forward to more posts on this topic.', username: 'Alex' },
    ],
  },
  {
    title: 'Quantum Computing: A New Era of Computing',
    body: 'Quantum computing holds the potential to solve problems...',
    author: 'Emily Smith',
    date: '2024-04-28',
    comments: [
      { text: 'Fascinating read!', username: 'Mark' },
      { text: 'I have some questions about quantum algorithms.', username: 'Sarah' },
    ],
  },
  // Add more posts as needed
]

async function main() {
  for (const post of posts) {
    await prisma.post.create({
      data: {
        title: post.title,
        body: post.body,
        author: post.author,
        date: post.date,
        comments: {
          create: post.comments.map(comment => ({
            text: comment.text,
            username: comment.username,
          })),
        },
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 