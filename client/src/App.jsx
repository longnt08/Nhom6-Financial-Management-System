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

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
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
        {user ? (
          <>
            <div>
              <span>Welcome, {user.username}</span>
              <span>Role {user.role || 'user'}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
            <Link to="/">Tổng quan</Link>
            <Link to="/accounting">Dịch vụ kế toán</Link>
            <Link to="/audit">Dịch vụ kiểm toán</Link>
            <Link to="/budget">Dịch vụ quản lý ngân sách</Link>
            <Link to="/investment">Dịch vụ quản lý đầu tư</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

function AppContent() {
  return (
    <div>
      <Navigation />

      <div className="content">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes */}
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

          <Route path="/" element={
            <ProtectedRoute>
              <div>Home Page / Dashboard</div>
            </ProtectedRoute>
          } />
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