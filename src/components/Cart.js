import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/style/cart.css';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../data/products';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  const handleIncrease = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleApplyDiscount = () => {
    if (discountCode.trim().toUpperCase() === 'SAVE10') {
      setDiscountAmount(totalPrice * 0.1);
    } else {
      alert('Mã giảm giá không hợp lệ.');
    }
  };

  const discountedTotal = totalPrice - discountAmount;

  const handleCheckout = () => {
    setCheckoutMessage('Đơn hàng đã sẵn sàng. Chức năng thanh toán thật có thể kết nối ở bước tiếp theo.');
  };

  if (cartItems.length === 0) {
    return (
      <main className="cart cart-empty">
        <h1>Giỏ hàng đang trống</h1>
        <p>Khám phá các sản phẩm nổi bật và thêm món bạn thích vào giỏ hàng.</p>
        <Link to="/" className="primary-button">Tiếp tục mua sắm</Link>
      </main>
    );
  }

  return (
    <main className="cart">
      <div className="cart-header">
        <div>
          <span className="eyebrow">Thanh toán</span>
          <h1>Giỏ hàng của bạn</h1>
        </div>
        <button className="clear-btn" onClick={clearCart}>
          <FontAwesomeIcon icon={faTrash} /> Xóa tất cả
        </button>
      </div>

      <div className="cart-layout">
        <ul className="cart-list">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <span>{item.category}</span>
                <h3>{item.name}</h3>
                <p>{formatCurrency(item.price)}</p>
              </div>
              <div className="quantity">
                <button onClick={() => handleDecrease(item)} aria-label="Giảm số lượng">
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrease(item)} aria-label="Tăng số lượng">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>

        <aside className="cart-summary">
          <h2>Tóm tắt đơn hàng</h2>
          <div className="summary-row">
            <span>Tạm tính</span>
            <strong>{formatCurrency(totalPrice)}</strong>
          </div>
          <div className="summary-row">
            <span>Giảm giá</span>
            <strong>{formatCurrency(discountAmount)}</strong>
          </div>
          <div className="discount">
            <input
              type="text"
              placeholder="Nhập mã SAVE10"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button onClick={handleApplyDiscount}>Áp dụng</button>
          </div>
          <div className="summary-total">
            <span>Cần thanh toán</span>
            <strong>{formatCurrency(discountedTotal)}</strong>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>Thanh toán</button>
          {checkoutMessage && <p className="checkout-message">{checkoutMessage}</p>}
        </aside>
      </div>
    </main>
  );
}

export default Cart;
