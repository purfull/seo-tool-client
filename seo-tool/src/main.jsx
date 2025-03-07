import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthComponent from './Components/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthComponent />
  </StrictMode>,
)
