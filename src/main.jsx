import React from 'react'
import { createRoot } from 'react-dom/client'
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
  const root = createRoot(document.getElementById('root'))
  
  root.render(
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  )
}

startApp()
