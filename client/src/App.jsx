import {useState} from 'react'
import {
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom"
import AccountingPage from "./pages/Accounting/AccountingPage.jsx";
import AccountingRecordView from "./pages/Accounting/AccountingRecordView.jsx";
import AccountingReportView from "./pages/Accounting/AccountingReportView.jsx";
import AccountingRecordForm from "./pages/Accounting/AccountingRecordForm.jsx";
import AccountingReportForm from "./pages/Accounting/AccountingReportForm.jsx";
import AuditPage from "./pages/Audit/AuditPage.jsx";
import AuditView from "./pages/Audit/AuditView.jsx";
import AuditForm from "./pages/Audit/AuditForm.jsx";


function App() {


  return (
    <div>
      <div className="sidebar">

        {/*{user*/}
        {/*  ? <em><img src="https://m.yodycdn.com/blog/cach-chup-anh-mat-dep-yodyvn7.jpg" alt="Avatar"/>*/}
        {/*    <h3>Phạm Phương Thảo</h3>*/}
        {/*    <p>Chức vụ: Admin</p>*/}
        {/*    <p>Hồ sơ</p></em>*/}
        {/*  : <Link to="/login">login</Link>*/}
        {/*}*/}

        <div className="menu">

          <Link to="/">Tổng quan</Link>
          <Link to="/accounting">Dịch vụ kế toán</Link>
          <Link to="/audit">Dịch vụ kiểm toán</Link>
          <Link to="/budget">Dịch vụ quản lý ngân sách</Link>
          <Link to="/investment">Dịch vụ quản lý đầu tư</Link>
          {/*<a href="#">Lĩnh vực khác</a>*/}
          {/*<a href="#">Tính năng mới</a>*/}
          {/*<a href="#">Cài đặt</a>*/}
        </div>
      </div>

      <Routes>
        <Route path="/accounting" element={<AccountingPage/>}/>
        <Route path="/accounting/record/create" element={<AccountingRecordForm/>}/>
        <Route path="/accounting/record/view/:id" element={<AccountingRecordView/>}/>
        <Route path="/accounting/record/edit/:id" element={<AccountingRecordForm/>}/>
        <Route path="/accounting/report/create" element={<AccountingReportForm/>}/>
        <Route path="/accounting/report/view/:id" element={<AccountingReportView/>}/>
        <Route path="/accounting/report/edit/:id" element={<AccountingReportForm/>}/>
        <Route path="/audit" element={<AuditPage/>}/>
        <Route path="/audit/create" element={<AuditForm/>}/>
        <Route path="/audit/view/:id" element={<AuditView/>}/>
        <Route path="/audit/edit/:id" element={<AuditForm/>}/>
        {/*<Route path="/budget" element={</>}/>*/}
        {/*<Route path="/investment" element={</>}/>*/}
        {/*<Route path="/" element={<HomePage/>}/>*/}
      </Routes>

    </div>
  )
}

export default App
