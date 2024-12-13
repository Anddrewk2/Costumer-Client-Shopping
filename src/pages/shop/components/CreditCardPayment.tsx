import { Button, Form, Input, Typography } from 'antd';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import handleAPI from '@/apis/handleAPI';
import { redirect } from 'next/dist/server/api-utils';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');
interface CreditCardPaymentProps {
  amount: number;
}
const CreditCardPayment = ({ amount }: CreditCardPaymentProps) =>{
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  const handlePayment = async (values: any) => {
    setLoading(true);
    setErrorMessage(null);
  
    if (!stripe || !elements) {
      setErrorMessage('Stripe không khả dụng');
      setLoading(false);
      return;
    }
  
    try {
      const cardElement = elements.getElement(CardElement);
  
      if (!cardElement) {
        setErrorMessage('Không thể tìm thấy thông tin thẻ');
        setLoading(false);
        return;
      }
  
      // Validate card information before creating token
      const { error, token } = await stripe.createToken(cardElement, {
        name: values.cardName
      });
  
      if (error) {
        // Detailed error handling
        switch(error.code) {
          case 'incomplete_number':
            setErrorMessage('Số thẻ chưa đầy đủ');
            break;
          case 'invalid_number':
            setErrorMessage('Số thẻ không hợp lệ');
            break;
          case 'invalid_expiry':
            setErrorMessage('Ngày hết hạn không hợp lệ');
            break;
          case 'incomplete_expiry':
            setErrorMessage('Ngày hết hạn chưa đầy đủ');
            break;
          default:
            setErrorMessage(error.message || 'Lỗi không xác định');
        }
        setLoading(false);
        return;
      }
  
      // Gửi request thanh toán sử dụng amount từ props
      const response = await handleAPI({
        method: 'post',
        url: '/stripe/charge',
        data: {
          amount: amount,  // Sử dụng amount từ props
          token: token?.id, 
        },
      });
  
      if (response) {
        alert('Thanh toán thành công!');
      } else {
        setErrorMessage('Thanh toán thất bại');
      }
    } catch (error: any) {
      console.error('Lỗi thanh toán:', error);
      setErrorMessage('Đã xảy ra lỗi khi thanh toán');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <Form form={form} onFinish={handlePayment} layout="vertical" size="large">
        <Form.Item
          name="card"
          label="Thông tin thẻ"
          rules={[{ required: true, message: 'Vui lòng nhập thông tin thẻ!' }]}>
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </Form.Item>

        <Form.Item
          name="cardName"
          label="Tên chủ thẻ"
          rules={[{ required: true, message: 'Vui lòng nhập tên chủ thẻ!' }]}>
          <Input placeholder="Nguyen Van A" />
        </Form.Item>

        {errorMessage && (
          <Typography.Text type="danger" style={{ display: 'block', marginBottom: 16 }}>
            {errorMessage}
          </Typography.Text>
        )}
      </Form>

      <Typography.Paragraph type="secondary">
        Thông tin thanh toán được bảo mật an toàn
      </Typography.Paragraph>

      <div className="mt-2">
        <Button
          type="primary"
          loading={loading}
          style={{ padding: '10px 50px' }}
          onClick={() => form.submit()}>
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

const PaymentForm = ({ grandTotal }: { grandTotal: number }) => {
  return (
    <Elements stripe={stripePromise}>
      <CreditCardPayment amount={grandTotal} />
    </Elements>
  );
};

export default PaymentForm;

