import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom";
import { AuthWrapper } from './context/auth.context.jsx';
import { useEffect } from 'react';

createRoot(document.getElementById('root')).render(
   <AuthWrapper>
  <StrictMode>
  <Router>
    <App />
    </Router>
  </StrictMode>
  </AuthWrapper>
  
)
