import posthog from 'posthog-js'

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: 'https://app.posthog.com',
  capture_pageview: true
})

export default posthog
