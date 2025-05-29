// src/layouts/MarketLayout.jsx
import { Routes, Route } from 'react-router-dom'
import MarketNavBar    from '../../components/Global-market-components/MarketNavBar'
import MarketFooter    from '../../components/Global-market-components/MarketFooter'
import MarketHome from '../../pages/MarketHome'
import MarketSub from '../../components/Global-market-components/MarketSub'
import MarketInsight from '../../pages/MarketInsight'
import MarketSolution from '../../pages/MarketSolution'
import MarketEvent from '../../pages/MarketEvent'
import MarketFinancial from '../../pages/MarketFinancial'
import MarketAboutUs from '../../pages/MarketAboutUs'


export default function MarketLayout() {
  return (
    <>
      <MarketNavBar />
      <MarketSub/>
      <main>
        <Routes>
          {/* GET /market             → MarketHome */}
          <Route index element={<MarketHome />} />
          {/* GET /market/stocks      → StocksPage */}
          <Route path="insight" element={<MarketInsight />} />

          <Route path="solution" element={<MarketSolution />} />

          <Route path="event" element={<MarketEvent />} />

          <Route path="finacial" element={<MarketFinancial />} />

          <Route path="about" element={<MarketAboutUs />} />

          



        </Routes>
      </main>
      <MarketFooter />
      {/* hhhhh */}
    </>
  )
}
