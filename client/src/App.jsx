import {useState} from 'react'
import {
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom"


function App() {


  return (
    <div>
      <div className="sidebar">

        {user
          ? <em><img src="https://m.yodycdn.com/blog/cach-chup-anh-mat-dep-yodyvn7.jpg" alt="Avatar"/>
            <h3>Phạm Phương Thảo</h3>
            <p>Chức vụ: Admin</p>
            <p>Hồ sơ</p></em>
          : <Link to="/login">login</Link>
        }

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
        {/*<Route path="/accounting" element={</>}/>*/}
        {/*<Route path="/audit" element={</>}/>*/}
        {/*<Route path="/budget" element={</>}/>*/}
        {/*<Route path="/investment" element={</>}/>*/}
        {/*<Route path="/" element={<HomePage/>}/>*/}
      </Routes>

    </div>
  )
}

export default App
