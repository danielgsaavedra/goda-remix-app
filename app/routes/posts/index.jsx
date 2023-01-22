import { useLoaderData, Link } from '@remix-run/react'
import { db } from '../../services/db.js'

export const loader = async () => {
  const posts = await db.post.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return { posts }
}

const Index = () => {
  const { posts } = useLoaderData()
  return (
    <div>
      <h1>Lista de Posts</h1>
      <nav>
        <ul>
          <li>
            <Link to="/posts/create">
              Crear nuevo post
            </Link>
          </li>
        </ul>
      </nav>
      {posts.map(post => (
        <div key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Index
