
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom";
import { AuthWrapper } from './context/auth.context.jsx';


createRoot(document.getElementById('root')).render(
   <AuthWrapper>
  <Router>
    <App />
    </Router>
  </AuthWrapper>
  
)
