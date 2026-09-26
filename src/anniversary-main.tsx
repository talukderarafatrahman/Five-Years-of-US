import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AnniversaryPage from './Anniversary'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AnniversaryPage />
  </StrictMode>,
)