// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

// Layouts
import HomeLayout    from './layouts/Home/HomeLayout'
import KoreaLayout   from './layouts/HSSBBCC Korea/KoreaLayout'
import MarketLayout  from './layouts/Global Market/MarketLayout'
import BankingLayout from './layouts/Global Banking/BankingLayout'
import AdminLayout   from './layouts/Admin/AdminLayout'
import UserLayout    from './layouts/User/UserLayout'
import RequireAuth from './components/Auth/RequireAuth'; // Add this import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 1) Home + Login (and all sub‑paths) */}
        <Route path="/*" element={<HomeLayout />} />

        {/* 2) HSBC Korea */}
        <Route path="/korea/*" element={<KoreaLayout />} />

        {/* 3) Global Market */}
        <Route path="/market/*" element={<MarketLayout />} />

        {/* 4) Global Banking */}
        <Route path="/banking/*" element={<BankingLayout />} />

        {/* 5) Admin */}
        <Route path="/admin/*" element={<AdminLayout  />} />

        {/* 6) User */}
       <Route
          path="/user/*"
          element={
            <RequireAuth>
              <UserLayout />
            </RequireAuth>
          }
        />

        {/* 7) Unknown path → Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
