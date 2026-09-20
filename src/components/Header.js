import {
  faHome,
  faMagnifyingGlass,
  faShoppingBag,
  faShoppingCart,
  faSignOutAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import '../assets/style/header.css';

import { AuthContext } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

function Header({ search, setSearch }) {
  const {
    isLoggedIn,
    username,
    isAdmin,
    logout,
  } = useContext(AuthContext);

  const { cartItems } = useCart();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // ==============================
  // CLICK RA NGOÀI
  // ==============================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener(
      'click',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'click',
        handleClickOutside
      );
    };
  }, []);

  // ==============================
  // LOGOUT
  // ==============================
  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate('/login');
  };

  // ==============================
  // ACCOUNT CLICK
  // ==============================
  const handleAccountClick = (event) => {
    event.stopPropagation();

    setDropdownOpen((prev) => !prev);
  };

  return (
    <header className="header">

      <div className="header-container">

        {/* LOGO */}
        <Link
          to="/"
          className="brand"
        >
          <span className="brand-mark">
            <FontAwesomeIcon
              icon={faShoppingBag}
            />
          </span>

          <span>ShopTN</span>
        </Link>


        {/* MENU */}
        <nav className="nav">

          <Link
            to="/"
            className="nav-link"
          >
            <FontAwesomeIcon
              icon={faHome}
              className="icon"
            />

            Trang chủ
          </Link>


          <a
            href="/#products"
            className="nav-link"
          >
            Sản phẩm
          </a>


          <Link
            to="/cart"
            className="nav-link cart-link"
          >
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="icon"
            />

            Giỏ hàng

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </Link>

        </nav>


        {/* RIGHT */}
        <div className="header-actions">

          {/* SEARCH */}
          <label
            className="search-bar"
            htmlFor="site-search"
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
            />

            <input
              id="site-search"
              type="text"
              placeholder="Tìm sản phẩm..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </label>


          {/* ACCOUNT */}
          {isLoggedIn ? (

            <div
              className="dropdown"
              ref={dropdownRef}
            >

              <button
                type="button"
                className="account-button"
                onClick={handleAccountClick}
              >

                <FontAwesomeIcon
                  icon={faUser}
                />

                <span>
                  {username}
                </span>

              </button>


              {dropdownOpen && (

                <div className="dropdown-menu">

                  {isAdmin && (
                    <button
                      type="button"
                      className="dropdown-admin-btn"
                      onClick={(event) => {
                        event.stopPropagation();

                        setDropdownOpen(false);

                        navigate('/admin');
                      }}
                    >
                      ⚙️ Quản trị
                    </button>
                  )}


                  <button
                    type="button"
                    className="logout-btn"
                    onClick={(event) => {
                      event.stopPropagation();

                      handleLogout();
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                    />

                    Đăng xuất
                  </button>

                </div>

              )}

            </div>

          ) : (

            <Link
              to="/login"
              className="login-link-button"
            >
              <FontAwesomeIcon
                icon={faUser}
              />

              Đăng nhập
            </Link>

          )}

        </div>

      </div>

    </header>
  );
}

export default Header;