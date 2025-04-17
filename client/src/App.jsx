// client/src/App.jsx
import { useState } from 'react'
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate
} from "react-router-dom"
import AccountingPage from "./pages/Accounting/AccountingPage.jsx";
import AccountingRecordView from "./pages/Accounting/AccountingRecordView.jsx";
import AccountingReportView from "./pages/Accounting/AccountingReportView.jsx";
import AccountingRecordForm from "./pages/Accounting/AccountingRecordForm.jsx";
import AccountingReportForm from "./pages/Accounting/AccountingReportForm.jsx";
import AuditPage from "./pages/Audit/AuditPage.jsx";
import AuditView from "./pages/Audit/AuditView.jsx";
import AuditForm from "./pages/Audit/AuditForm.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";
import { AuthProvider, useAuth } from './AuthContext.jsx';
import BudgetPage from "./pages/budget/BudgetPage.jsx";
import BudgetForm from "./pages/budget/BudgetForm.jsx";
import BudgetView from "./pages/budget/BudgetView.jsx";
import InvestmentPage from './pages/Investment/InvestmentPage.jsx';
import InvestmentForm from './pages/Investment/InvestmentForm.jsx';
import InvestmentView from './pages/Investment/InvestmentView.jsx';
import HomePage from './pages/HomePage.jsx';
import TopNav from './components/TopNav';
import './styles.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="sidebar">
      <div className="menu">
        <div>
          {user ? (
            <>
              <div className="user-info">
                <div className="user-details">
                  <span>{user.username}</span>
                  <span>Chức vụ: {user.role || 'user'}</span>
                </div>
                <button onClick={handleLogout}>Đăng xuất</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">Đăng nhập</Link>
              <Link to="/register">Đăng ký</Link>
            </>
          )}
        </div>
        <Link to="/">Tổng quan</Link>
        <Link to="/accounting">Dịch vụ kế toán</Link>
        <Link to="/audit">Dịch vụ kiểm toán</Link>
        <Link to="/budget">Dịch vụ quản lý ngân sách</Link>
        <Link to="/investment">Dịch vụ quản lý đầu tư</Link>
      </div>
    </div>
  );
};

function AppContent() {
  return (
    <div>
      <Navigation />
      <div className="content">
        <TopNav />
        <Routes>
          {/* All routes are public now */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/accounting" element={
            <ProtectedRoute>
              <AccountingPage />
            </ProtectedRoute>
          } />
          <Route path="/accounting/record/create" element={
            <ProtectedRoute>
              <AccountingRecordForm />
            </ProtectedRoute>
          } />
          <Route path="/accounting/record/view/:id" element={
            <ProtectedRoute>
              <AccountingRecordView />
            </ProtectedRoute>
          } />
          <Route path="/accounting/record/edit/:id" element={
            <ProtectedRoute>
              <AccountingRecordForm />
            </ProtectedRoute>
          } />
          <Route path="/accounting/report/create" element={
            <ProtectedRoute>
              <AccountingReportForm />
            </ProtectedRoute>
          } />
          <Route path="/accounting/report/view/:id" element={
            <ProtectedRoute>
              <AccountingReportView />
            </ProtectedRoute>
          } />
          <Route path="/accounting/report/edit/:id" element={
            <ProtectedRoute>
              <AccountingReportForm />
            </ProtectedRoute>
          } />
          <Route path="/audit" element={
            <ProtectedRoute>
              <AuditPage />
            </ProtectedRoute>
          } />
          <Route path="/audit/create" element={
            <ProtectedRoute>
              <AuditForm />
            </ProtectedRoute>
          } />
          <Route path="/audit/view/:id" element={
            <ProtectedRoute>
              <AuditView />
            </ProtectedRoute>
          } />
          <Route path="/audit/edit/:id" element={
            <ProtectedRoute>
              <AuditForm />
            </ProtectedRoute>
          } />
          <Route path="/budget" element={
            <ProtectedRoute>
              <BudgetPage />
            </ProtectedRoute>
          } />
          <Route path="/budget/create" element={
            <ProtectedRoute>
              <BudgetForm />
            </ProtectedRoute>
          } />
          <Route path="/budget/view/:id" element={
            <ProtectedRoute>
              <BudgetView />
            </ProtectedRoute>
          } />
          <Route path="/budget/edit/:id" element={
            <ProtectedRoute>
              <BudgetForm />
            </ProtectedRoute>
          } />
          <Route
              path="/investment"
              element={
                <ProtectedRoute>
                  <InvestmentPage />
                </ProtectedRoute>
              }
          />
          <Route
              path="/investment/record/create"
              element={
                <ProtectedRoute>
                  <InvestmentForm />
                </ProtectedRoute>
              }
          />
          <Route
              path="/investment/record/view/:id"
              element={
                <ProtectedRoute>
                  <InvestmentView />
                </ProtectedRoute>
              }
          />
          <Route
              path="/investment/record/edit/:id"
              element={
                <ProtectedRoute>
                  <InvestmentForm />
                </ProtectedRoute>
              }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
