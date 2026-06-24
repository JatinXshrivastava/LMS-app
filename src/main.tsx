import { AppContextProvider } from './context/AppContext.tsx'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import { ClerkProvider } from '@clerk/react'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
    > 
    <AppContextProvider>
      <App />
    </AppContextProvider>
    </ClerkProvider>
  </BrowserRouter>
)
