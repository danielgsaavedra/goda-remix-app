import { Link } from '@remix-run/react'

const Index = () => {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/posts">Post</Link>
        </li>
        </ul>
      </nav>
    </div>
  )
}

export default Index
