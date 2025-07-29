'use client'
import { useSearchParams } from 'next/navigation'

export default function RegisteredNotice() {
  const searchParams = useSearchParams()
  const registered = searchParams.get('registered') === 'true'

  if (!registered) return null

  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
      Registration successful! Please login.
    </div>
  )
}
