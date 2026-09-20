import { useContext, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import '../assets/style/login.css';
import { AuthContext } from '../contexts/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const isAdminMode = useMemo(() => searchParams.get('mode') === 'admin', [searchParams]);

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const adminCredentials = { username: 'admin', password: 'admin123', role: 'admin' };

    if (username === adminCredentials.username && password === adminCredentials.password) {
      login(adminCredentials);
      navigate('/');
      return;
    }

    if (storedUser && storedUser.username === username && storedUser.password === password) {
      login(storedUser);
      navigate('/');
      return;
    }

    alert('Tên đăng nhập hoặc mật khẩu không chính xác.');
  };

  return (
    <main className="auth-page">
      <div className="auth-panel">
        <span className="eyebrow">{isAdminMode ? 'Quản trị hệ thống' : 'Tài khoản'}</span>
        <h1>{isAdminMode ? 'Đăng nhập Admin' : 'Đăng nhập'}</h1>
        <p>
          {isAdminMode
            ? 'Bạn cần đăng nhập bằng tài khoản quản trị để quản lý sản phẩm, đơn hàng và khách hàng.'
            : 'Quản lý đơn hàng, lưu giỏ hàng và nhận ưu đãi dành riêng cho bạn.'}
        </p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">
            {isAdminMode ? 'Đăng nhập quản trị' : 'Đăng nhập'}
          </button>
        </form>

        {!isAdminMode && (
          <div className="auth-switch">
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </div>
        )}

        {isAdminMode && (
          <div className="auth-switch">
            
          </div>
        )}
      </div>
    </main>
  );
}

export default Login;
