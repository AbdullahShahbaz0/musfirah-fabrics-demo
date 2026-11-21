import { Link } from 'react-router-dom'
import { useSeo } from '../lib/seo'

export default function NotFound() {
  useSeo('Page not found')
  return (
    <div className="wrap py-28 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-5xl md:text-7xl">This page has unravelled</h1>
      <p className="mx-auto mt-4 max-w-md text-mute">The page you're looking for doesn't exist in this demo.</p>
      <Link to="/" className="btn-primary mt-9">Back to home</Link>
    </div>
  )
}
