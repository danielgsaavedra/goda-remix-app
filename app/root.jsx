import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react'
import globalStyles from '~/styles/global.css'

export const meta = () => ({
  charset: 'utf-8',
  title: 'Goda Remix App',
  viewport: 'width=device-width,initial-scale=1'
})

export const links = () => [
  {
    rel: 'stylesheet',
    href: globalStyles
  },
  {
    rel: 'stylesheet',
    href: 'https://cdn.simplecss.org/simple.min.css'
  }
]

const Layout = () => {
  return (
    <div>
      <header>
      <Link to="/">
        <h1>Goda Remix App</h1>
      </Link>
      </header>
      <Outlet />
      <footer>
        <small>© Goda Factory 2023</small>
      </footer>
    </div>
  )
}

const App = () => {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default App
