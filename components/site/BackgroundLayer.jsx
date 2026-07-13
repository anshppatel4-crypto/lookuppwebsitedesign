'use client'

import dynamic from 'next/dynamic'

// Load the WebGL scene only on the client. Because this component lives in the
// root layout, it mounts once and persists across page navigation (the network
// never restarts when changing routes).
const ConnectionBackground = dynamic(() => import('./ConnectionBackground'), { ssr: false })

export default function BackgroundLayer() {
  return <ConnectionBackground />
}
