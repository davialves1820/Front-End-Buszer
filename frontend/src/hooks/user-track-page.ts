import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import posthog from 'posthog-js'

export function usePageTracking() {
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname

    // Nome amigável para cada página
    const pageNameMap: Record<string, string> = {
      '/': 'home',
      '/schedules': 'schedules'
    }

    // Se não existir nos mapeamentos, usa o próprio path
    const pageName = pageNameMap[path] || 'not_found'

    // Envia para o PostHog
    posthog.capture('page_view_custom', {
      page: pageName
    })
  }, [location])
}
