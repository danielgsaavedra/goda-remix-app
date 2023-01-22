import { useLoaderData } from '@remix-run/react'
import { db } from '../../services/db.js'

export const loader = async ({ params }) => {
  const post = await db.post.findUnique({
    where: { id: params.postId }
  })
  return { post }
}

const SinglePost = () => {
  const { post } = useLoaderData()
  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </>
  )
}

export default SinglePost
