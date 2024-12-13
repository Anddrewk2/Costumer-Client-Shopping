// components/Reviews.tsx

import React from 'react';
import { Card, List, Typography, Divider } from 'antd';
import {  AddressModel } from '@/models/ProductModel';
import { CartItemModel } from '@/reduxs/reducers/cartReducer';

interface ReviewsProps {
  cartItems: CartItemModel[];
  paymentDetail: {
    address: AddressModel;
    paymentMethod: string; // Đảm bảo là string
  };
  grandTotal: number;
}

const Reviews: React.FC<ReviewsProps> = ({ cartItems, paymentDetail, grandTotal }) => {
  console.log('Reviews Props:', { cartItems, paymentDetail, grandTotal });
  return (
    <Card title="Tóm Tắt Đơn Hàng">
      <Typography.Title level={4}>Sản Phẩm</Typography.Title>
      <List
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.title}
              description={`Số lượng: ${item.count}`}
            />
            <div>{(item.price * item.count).toLocaleString()} VNĐ</div>
          </List.Item>
        )}
      />
      <Divider />
      <Typography.Paragraph>
        <strong>Tổng:</strong> {grandTotal.toLocaleString()} VNĐ
      </Typography.Paragraph>
      <Typography.Paragraph>
        <strong>Phương Thức Thanh Toán:</strong> {paymentDetail.paymentMethod}
      </Typography.Paragraph>
      <Divider />
      <Typography.Title level={4}>Địa Chỉ Giao Hàng</Typography.Title>
      <Typography.Paragraph>
        <strong>Tên:</strong> {paymentDetail.address.name}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <strong>Địa Chỉ:</strong> {paymentDetail.address.address}
      </Typography.Paragraph>
      {/* Bạn có thể thêm các thông tin khác như số điện thoại, email nếu cần */}
    </Card>
  );
};

export default Reviews;
