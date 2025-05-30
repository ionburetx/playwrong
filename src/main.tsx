import React from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import './index.css'
import Router from './router'

async function enableMocking() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser')
    await worker.start({
      onUnhandledRequest: 'bypass',
    })
  }
}

// Inicializar la aplicación
const startApp = async () => {
  //await enableMocking()
  const root = createRoot(document.getElementById('root')!)
  
  root.render(
    <React.StrictMode>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin + '/home'
        }}
      >
        <Router />
      </Auth0Provider>
    </React.StrictMode>
  )
}

startApp()
