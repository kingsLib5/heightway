// src/layouts/BankingLayout.jsx
import { Routes, Route } from 'react-router-dom'
import BankingNavBar   from '../../components/Global-bank-components/BankingNavBar'
import BankingFooter   from '../../components/Global-bank-components/BankingFooter'
import BankingHome from '../../pages/BankingHome'


export default function BankingLayout() {
  return (
    <>
      <BankingNavBar />
      <main>
        <Routes>
          {/* GET /banking                       → BankingHome */}
          <Route index element={<BankingHome />} />
          {/* GET /banking/accounts              → AccountsList */}
          {/* <Route path="accounts" element={<AccountsList />} /> */}
          
        </Routes>
      </main>
      <BankingFooter />
    </>
  )
}
