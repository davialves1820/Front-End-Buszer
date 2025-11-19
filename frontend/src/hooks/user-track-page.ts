import { useEffect } from 'react'
import { useLocation, matchRoutes } from 'react-router-dom'
import posthog from 'posthog-js'
import { routes } from '../routes'

export function usePageTracking() {
  const location = useLocation()

  useEffect(() => {
    const matched = matchRoutes(routes, location)

    let pageName = 'unknown'

    if (matched && matched.length > 0) {
      const route = matched[0].route

      // pega "name" se definido na rota
      if (route.name) {
        pageName = route.name
      }
      // senão pega o path e converte para nome
      else if (route.path) {
        pageName = route.path.replace('/', '') || 'home'
      }
    }

    posthog.capture('page_view_custom', {
      page: pageName,
      path: location.pathname
    })
  }, [location])
}
