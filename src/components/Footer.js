import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '../assets/style/footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div>
          <h2>ShopEase</h2>
          <p>
            Cửa hàng trực tuyến tập trung vào trải nghiệm mua sắm gọn gàng,
            sản phẩm chọn lọc và dịch vụ hỗ trợ rõ ràng.
          </p>
        </div>

        <div>
          <h3>Liên hệ</h3>
          <ul>
            <li><FontAwesomeIcon icon={faPhone} /> 0900 123 456</li>
            <li><FontAwesomeIcon icon={faEnvelope} /> support@shopease.vn</li>
            <li><FontAwesomeIcon icon={faLocationDot} /> TP. Hồ Chí Minh</li>
          </ul>
        </div>

        <div>
          <h3>Nhận tin ưu đãi</h3>
          <form className="footer-form">
            <input type="email" placeholder="Email của bạn" aria-label="Email của bạn" />
            <button type="submit">Gửi</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
}
