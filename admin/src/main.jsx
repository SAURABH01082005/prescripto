import React from "react";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminContextProvider from "./contexts/AdminContext.jsx";
import DoctorContextProvider from "./contexts/DoctorContext.jsx";
import AppContextProvider from "./contexts/AppContext.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>

          <App />
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
  </StrictMode>
)
