"use client"

import { useCallback, useEffect, useState } from "react"

/**
 * Countdown backed by an absolute end timestamp so it does not drift when the
 * tab is hidden. When `storageKey` is set the end timestamp is kept in
 * sessionStorage, so a refresh resumes the same countdown.
 */
export const useCountdown = (initialSeconds: number, storageKey?: string) => {
  const [endAt, setEndAt] = useState<number | null>(null)
  const [remaining, setRemaining] = useState(initialSeconds)

  useEffect(() => {
    if (storageKey) {
      const stored = window.sessionStorage.getItem(storageKey)
      const parsed = stored ? Number(stored) : Number.NaN

      if (Number.isFinite(parsed)) {
        setEndAt(parsed)
        return
      }
    }

    const next = Date.now() + initialSeconds * 1000
    setEndAt(next)

    if (storageKey) {
      window.sessionStorage.setItem(storageKey, String(next))
    }
  }, [initialSeconds, storageKey])

  useEffect(() => {
    if (endAt === null) return

    const tick = () => {
      const left = Math.max(0, Math.ceil((endAt - Date.now()) / 1000))
      setRemaining(left)
    }

    tick()
    const id = window.setInterval(tick, 1000)

    return () => window.clearInterval(id)
  }, [endAt])

  const restart = useCallback(() => {
    const next = Date.now() + initialSeconds * 1000
    setRemaining(initialSeconds)
    setEndAt(next)

    if (storageKey) {
      window.sessionStorage.setItem(storageKey, String(next))
    }
  }, [initialSeconds, storageKey])

  return {
    remaining,
    isFinished: endAt !== null && remaining === 0,
    restart,
  }
}
