'use client'

import { Suspense, use } from 'react'
import { handlers } from '@/mocks/handlers'

const mockingEnabledPromise =
  typeof window !== 'undefined'
    ? import('@/mocks/browser').then(async ({ default: worker }) => {
      if (process.env.NEXT_PUBLIC_API_MOCKING === 'false') {
        return;
      }
      await worker.start({
        serviceWorker: { url: '/mockServiceWorker.js' },
        onUnhandledRequest(request, print) {
          const url = request.url;
          if (
            url.includes('/_next') ||
            url.includes('_rsc=') ||
            url.endsWith('/favicon.ico') ||
            url.includes('/fonts') ||
            url.includes('/images')
          ) {
            return
          }
          print.warning();
        },
      })
      worker.use(...handlers);
      console.log(worker.listHandlers())
    })
    : Promise.resolve()

export function MSWProvider({
                              children,
                            }: Readonly<{
  children: React.ReactNode
}>) {
  // If MSW is enabled, we need to wait for the worker to start,
  // so we wrap the children in a Suspense boundary until it's ready.
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  )
}

function MSWProviderWrapper({
                              children,
                            }: Readonly<{
  children: React.ReactNode
}>) {
  use(mockingEnabledPromise)
  return children
}