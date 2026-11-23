import { useCallback, useSyncExternalStore } from 'react'

export function useMediaQuery(query: string) {
  const subscribe = useCallback((notify: () => void) => {
    const media = window.matchMedia(query)
    media.addEventListener('change', notify)
    // Resize is a fallback: the snapshot is re-read, so a missed change event cannot leave it stale.
    window.addEventListener('resize', notify)
    return () => {
      media.removeEventListener('change', notify)
      window.removeEventListener('resize', notify)
    }
  }, [query])

  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false)
}
