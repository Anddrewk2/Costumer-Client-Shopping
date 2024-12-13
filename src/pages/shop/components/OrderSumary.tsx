/** @format */

import React from 'react';
import { Card, List, Typography, Divider } from 'antd';
import { AddressModel } from '@/models/ProductModel';
import { CartItemModel } from '@/reduxs/reducers/cartReducer';

interface OrderSummaryProps {
	orderItems: CartItemModel[];
	totalAmount: number;
	paymentMethod: string;
	shippingAddress: AddressModel;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
	orderItems,
	totalAmount,
	paymentMethod,
	shippingAddress,
}) => {
	return (
		<Card title="Tóm Tắt Đơn Hàng">
			<Typography.Title level={4}>Sản Phẩm</Typography.Title>
			<List
				dataSource={orderItems}
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
				<strong>Tổng:</strong> {totalAmount.toLocaleString()} VNĐ
			</Typography.Paragraph>
			<Typography.Paragraph>
				<strong>Phương Thức Thanh Toán:</strong> {paymentMethod}
			</Typography.Paragraph>
			<Divider />
			<Typography.Title level={4}>Địa Chỉ Giao Hàng</Typography.Title>
			<Typography.Paragraph>
				<strong>Tên:</strong> {shippingAddress.name}
			</Typography.Paragraph>
			<Typography.Paragraph>
				<strong>Địa Chỉ:</strong> {shippingAddress.address}
			</Typography.Paragraph>
			{/* Bạn có thể thêm các thông tin khác như số điện thoại, email nếu cần */}
		</Card>
	);
};

export default OrderSummary;
