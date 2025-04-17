import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Trang chủ - Hệ thống Quản lý Tài chính</h1>
      <div className="container">
        <div className="box">
          <h3>Dịch vụ kế toán</h3>
          <div className="buttons">
            <button onClick={() => navigate('/accounting')}>Xem</button>
            <button onClick={() => navigate('/accounting/record/create')}>Tạo mới</button>
          </div>
        </div>

        <div className="box">
          <h3>Dịch vụ kiểm toán</h3>
          <div className="buttons">
            <button onClick={() => navigate('/audit')}>Xem</button>
            <button onClick={() => navigate('/audit/create')}>Tạo mới</button>
          </div>
        </div>

        <div className="box">
          <h3>Quản lý ngân sách</h3>
          <div className="buttons">
            <button onClick={() => navigate('/budget')}>Xem</button>
            <button onClick={() => navigate('/budget/create')}>Tạo mới</button>
          </div>
        </div>

        <div className="box">
          <h3>Quản lý đầu tư</h3>
          <div className="buttons">
            <button onClick={() => navigate('/investment')}>Xem</button>
            <button onClick={() => navigate('/investment/record/create')}>Tạo mới</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
