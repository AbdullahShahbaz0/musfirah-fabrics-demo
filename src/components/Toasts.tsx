import { Check } from 'lucide-react'
import { useStore } from '../context/Store'

export function Toasts() {
  const { toasts } = useStore()
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[100] flex flex-col items-center gap-2 px-4" aria-live="polite" role="status">
      {toasts.map(t => (
        <div key={t.id} className="pointer-events-auto flex max-w-md animate-fadeUp items-center gap-3 bg-charcoal px-5 py-3.5 text-sm text-ivory shadow-2xl">
          <Check size={16} className="shrink-0 text-gold" /> {t.msg}
        </div>
      ))}
    </div>
  )
}
