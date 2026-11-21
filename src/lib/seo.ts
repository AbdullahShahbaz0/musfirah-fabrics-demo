import { useEffect } from 'react'

export function useSeo(title: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — Musfirah Fabrics (Demo)` : 'Musfirah Fabrics — Premium Pakistani Fashion & Fabrics (Concept Demo)'
    if (description) {
      let m = document.querySelector('meta[name="description"]')
      if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m) }
      m.setAttribute('content', description)
    }
  }, [title, description])
}

export function useScrollTop(dep: unknown) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }) }, [dep])
}
