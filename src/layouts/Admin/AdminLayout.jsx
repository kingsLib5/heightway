import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../../pages/AdminDashboard';
import AdDashboard from '../../components/Admin-components/AdDashboard';
import ManageUsers from "../../components/Admin-components/ManageUsers"; // Correct path// Corrected import
import ErrorBoundary from '../../components/Admin-components/ErrorBoundary';
import AdTransactions from '../../components/Admin-components/AdTransactions';
import AdSecurity from '../../components/Admin-components/AdSecurity';

export default function AdminLayout() {
  return (
    <Routes>
      <Route path="/*" element={
        <ErrorBoundary>
          <AdminDashboard />
        </ErrorBoundary>
      }>
        <Route index element={<AdDashboard />} />
        <Route path="manage" element={
          <ErrorBoundary>
            <ManageUsers />
          </ErrorBoundary>
        } />
         <Route path="transaction" element={
          <ErrorBoundary>
            <AdTransactions />
          </ErrorBoundary>
        } />
         <Route path="security" element={
          <ErrorBoundary>
            <AdSecurity />
          </ErrorBoundary>
        } />
      </Route>
    </Routes>
  );
}