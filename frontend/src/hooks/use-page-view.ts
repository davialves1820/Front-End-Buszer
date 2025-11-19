import { useEffect } from 'react'
import posthog from '../lib/posthog'

export function usePageView(pageName: string) {
  useEffect(() => {
    posthog.capture('$pageview', { page: pageName })
  }, [pageName])
}
