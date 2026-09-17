import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/style/register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Mật khẩu và xác nhận mật khẩu không trùng khớp.');
      return;
    }

    const newUser = { email, username, password };
    localStorage.setItem('user', JSON.stringify(newUser));
    navigate('/login');
  };

  return (
    <main className="auth-page">
      <div className="auth-panel">
        <span className="eyebrow">Thành viên mới</span>
        <h1>Đăng ký</h1>
        <p>Tạo tài khoản để mua sắm nhanh hơn và theo dõi ưu đãi mới nhất.</p>

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="register-username">Tên đăng nhập</label>
            <input
              id="register-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="register-password">Mật khẩu</label>
            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Xác nhận mật khẩu</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">Đăng ký</button>
        </form>

        <div className="auth-switch">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </div>
      </div>
    </main>
  );
}

export default Register;
