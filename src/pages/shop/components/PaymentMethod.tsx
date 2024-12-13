// components/PaymentMethod.tsx

import { Button, List, Modal, Radio, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import CreditCardPayment from './CreditCardPayment';
import CreditCardPaymentProps from '@/pages/shop/components/CreditCardPayment';

interface Props {
    onContinue: (val: string) => void; // Đổi từ any sang string
    grandTotal: number;
}

const methods = [
    { key: 'cod', title: 'Cash on delivery' },
    { key: 'debit', title: 'Debit/Credit card' },
    { key: 'google', title: 'Google pay' },
    { key: 'paypal', title: 'Paypal' },
];

const PaymentMethod = ({ onContinue, grandTotal }: Props) => {
    const [methodSelected, setMethodSelected] = useState('cod');
    const [isVisibleModalPayment, setIsVisibleModalPayment] = useState(false);
    const [isContinueEnabled, setIsContinueEnabled] = useState(false);

    // Kiểm tra nếu nhận được grandTotal
    useEffect(() => {
        console.log('Grand Total received:', grandTotal);
    }, [grandTotal]);

    // Bật/tắt nút "Continue" dựa trên phương thức thanh toán được chọn
    useEffect(() => {
        setIsContinueEnabled(!!methodSelected);
    }, [methodSelected]);

    // Render chi tiết phương thức thanh toán
    const renderPaymentDetail = () => {
        switch (methodSelected) {
            case 'debit':
                return (
                    <CreditCardPayment grandTotal={grandTotal}/>
                );
            default:
                return null;
        }
    };

    // Xử lý khi nhấn nút thanh toán
    const handlePayment = () => {
        if (methodSelected === 'cod') {
            onContinue(methodSelected); // Truyền trực tiếp string
        } else {
            setIsVisibleModalPayment(true);
        }
    };

    return (
        <div>
            <Typography.Title level={4}>Select Payment Method</Typography.Title>
            <div style={{ marginBottom: '16px' }}>
                <Typography.Text>
                    <strong>Grand Total:</strong> ${grandTotal}
                </Typography.Text>
            </div>
            <List
                dataSource={methods}
                renderItem={(item) => (
                    <List.Item key={item.key}>
                        <List.Item.Meta
                            title={
                                <Radio
                                    onChange={() => setMethodSelected(item.key)}
                                    checked={item.key === methodSelected}
                                >
                                    {item.title}
                                </Radio>
                            }
                            description={item.key === methodSelected && renderPaymentDetail()}
                        />
                    </List.Item>
                )}
            />
            <div className="mt-3">
                <Button
                    disabled={!isContinueEnabled}
                    type="primary"
                    onClick={handlePayment}
                    block
                >
                    Continue
                </Button>
            </div>
            <Modal
                open={isVisibleModalPayment}
                onCancel={() => setIsVisibleModalPayment(false)}
            >
                <h1>API Payment Supply</h1>
            </Modal>
        </div>
    );
};

export default PaymentMethod;
