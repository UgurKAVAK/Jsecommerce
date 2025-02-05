import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/Routes.tsx'
import { CardContextProvider } from './context/CardContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CardContextProvider>
      <RouterProvider router={router} />
    </CardContextProvider>
  </StrictMode>,
)
