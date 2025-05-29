// src/layouts/KoreaLayout.jsx
import { Routes, Route } from 'react-router-dom'
import KoreaNavBar  from '../../components/HSBC-korea-components/KoreaNavBar'
import KoreaFooter  from '../../components/HSBC-korea-components/KoreaFooter'
import KoreaHome from '../../pages/KoreaHome'


export default function KoreaLayout() {
  return (
    <>
      <KoreaNavBar />
      <main>
        <Routes>
          {/* GET /korea           → KoreaHome */}
          <Route index element={<KoreaHome />} />
          {/* GET /korea/offers    → KoreaOffers */}
          {/* <Route path="offers" element={<KoreaOffers />} /> */}
  
        </Routes>
      </main>
      <KoreaFooter />
    </>
  )
}
