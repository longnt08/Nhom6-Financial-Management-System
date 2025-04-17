import { useState } from 'react';
import { useAuth} from "../../AuthContext.jsx";
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(username, password);
    } catch (err) {
      setError(err.toString() || 'Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Đăng Nhập</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập <span className="required">*</span>:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu <span className="required">*</span>:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Link to="#" className="forgot-password">Quên mật khẩu</Link>
          <button type="submit" className="submit-btn">Gửi</button>
        </form>

        <p>
          Chưa có tài khoản? <Link to="/register">Đăng ký tại đây</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;