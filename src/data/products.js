export const products = [
  {
    id: 1,
    name: 'Áo khoác Urban',
    price: 890000,
    category: 'Thời trang',
    image: '/images/aokhoac.jpg',
    description: 'Áo khoác dáng hiện đại, chất liệu nhẹ, phù hợp đi làm và dạo phố.',
    badge: 'Bán chạy',
  },
  {
    id: 2,
    name: 'Điện thoại Iphone 17 Pro Max',
    price: 12990000,
    category: 'Công nghệ',
    image: '/images/phone.jpg',
    description: 'Điện thoại màn hình sắc nét, camera ổn định và pin dùng cả ngày.',
    badge: 'Mới',
  },
  {
    id: 3,
    name: 'Áo sơ mi Linen',
    price: 420000,
    category: 'Thời trang',
    image: '/images/shirt.jpg',
    description: 'Áo sơ mi thoáng mát, phom gọn, dễ phối cho nhiều dịp.',
    badge: 'Ưu đãi',
  },
  {
    id: 4,
    name: 'Đồng hồ Classic',
    price: 1850000,
    category: 'Phụ kiện',
    image: '/images/watch.jpg',
    description: 'Đồng hồ mặt tối giản, dây bền, tạo điểm nhấn thanh lịch mỗi ngày.',
    badge: 'Premium',
  },
  {
    id: 5,
    name: 'Giày Runner Pro',
    price: 1190000,
    category: 'Thời trang',
    image: '/images/shoes.jpg',
    description: 'Giày thể thao êm chân, đế bám tốt, hợp luyện tập và di chuyển.',
    badge: 'Hot',
  },
  {
    id: 6,
    name: 'Laptop Air 14',
    price: 21990000,
    category: 'Công nghệ',
    image: '/images/laptop.jpg',
    description: 'Laptop mỏng nhẹ, hiệu năng ổn định cho học tập, văn phòng và sáng tạo.',
    badge: 'Đề xuất',
  },
];

export const categories = ['Tất cả', 'Công nghệ', 'Thời trang', 'Phụ kiện'];

export const formatCurrency = (value) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
