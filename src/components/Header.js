import {
  faHome,
  faMagnifyingGlass,
  faShoppingBag,
  faShoppingCart,
  faSignOutAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/style/header.css';
import { AuthContext } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

function Header({ search, setSearch }) {
  const { isLoggedIn, username, logout, isAdmin } = useContext(AuthContext);
  const { cartItems } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="brand" aria-label="ShopEase">
          <span className="brand-mark">
            <FontAwesomeIcon icon={faShoppingBag} />
          </span>
          <span>ShopTN</span>
        </Link>

        <nav className="nav" aria-label="Điều hướng chính">
          <Link to="/" className="nav-link">
            <FontAwesomeIcon icon={faHome} className="icon" /> Trang chủ
          </Link>
          <a href="/#products" className="nav-link">
            Sản phẩm
          </a>
          <Link to="/cart" className="nav-link cart-link">
            <FontAwesomeIcon icon={faShoppingCart} className="icon" /> Giỏ hàng
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          {isAdmin && (
            <Link to="/admin" className="nav-link">
              Quản trị
            </Link>
          )}
        </nav>

        <div className="header-actions">
          <label className="search-bar" htmlFor="site-search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              id="site-search"
              type="text"
              placeholder="Tìm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          {isLoggedIn ? (
            <div className="dropdown">
              <button className="account-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <FontAwesomeIcon icon={faUser} />
                <span>{username}</span>
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button className="logout-btn" onClick={logout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="icon" /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-link-button">
              <FontAwesomeIcon icon={faUser} /> Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
