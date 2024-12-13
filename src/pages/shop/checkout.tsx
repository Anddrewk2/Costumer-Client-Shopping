// pages/checkout/CheckoutPage.tsx

/** @format */

import handleAPI from '@/apis/handleAPI';
import HeadComponent from '@/components/HeadComponent';
import { CartItemModel, cartSelector, syncProducts } from '@/reduxs/reducers/cartReducer';
import Reviews from './components/Reviews';
import { VND } from '@/utils/handleCurrency';
import {
  Button,
  Card,
  Divider,
  Input,
  message,
  Space,
  Steps,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { BiCreditCard } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa6';
import { HiHome } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import ListCart from './components/ListCart';
import ShipingAddress from './components/ShipingAddress';
import PaymentMethod from './components/PaymentMethod';
import { AddressModel } from '@/models/ProductModel';
import { useRouter } from 'next/router';

interface PaymentDetail {
  address: AddressModel;
  paymentMethod: string; // Đảm bảo là string
}

const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [discountCode, setDiscountCode] = useState('');
  const [discountValue, setDiscountValue] = useState<{
    value: number;
    type: string;
  }>();
  const [grandTotal, setGrandTotal] = useState(0);
  const [isCheckingCode, setIsCheckingCode] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0); // Khởi tạo với giá trị 0
  const [paymentDetail, setPaymentDetail] = useState<PaymentDetail>({
    address: {} as AddressModel,
    paymentMethod: '', // Giá trị mặc định là chuỗi rỗng
  });

  const carts: CartItemModel[] = useSelector(cartSelector);

  useEffect(() => {
    calculateGrandTotal();
  }, [discountValue, carts]);

  const calculateGrandTotal = () => {
    const total = carts.reduce((a, b) => a + b.count * b.price, 0);

    if (discountValue) {
      if (discountValue.type === 'percent') {
        setGrandTotal(Math.ceil(total - total * (discountValue.value / 100)));
      } else {
        setGrandTotal(total - discountValue.value);
      }
    } else {
      setGrandTotal(total);
    }
  };

  const handleCheckDiscountCode = async () => {
    const api = `/promotions/check?code=${discountCode}`;
    setIsCheckingCode(true);
    try {
      const res: any = await handleAPI({ url: api });
      const data = res.data.data;
      setDiscountValue(data);
      message.success('Add discount code success');
    } catch (error: any) {
      console.log(error);
      message.error(error.response?.data?.message || 'Invalid discount code');
    } finally {
      setIsCheckingCode(false);
    }
  };

  const renderComponents = () => {
    switch (currentStep) {
      case 0:
        return (
          <ShipingAddress
            onSelectAddress={(val) => {
              setPaymentDetail({ ...paymentDetail, address: val });
              setCurrentStep(1);
            }}
          />
        );
      case 1:
        return (
          <PaymentMethod 
            grandTotal={grandTotal} // Truyền grandTotal vào PaymentMethod
            onContinue={(methodSelected: string) => { // Đảm bảo methodSelected là string
              setPaymentDetail({ ...paymentDetail, paymentMethod: methodSelected });
              setCurrentStep(2);
            }}
          />
        );
      case 2:
        return (
          <Reviews 
            cartItems={carts} 
            paymentDetail={paymentDetail} 
            grandTotal={grandTotal} 
          />
        );
      default:
        return <ListCart />;
    }
  };

  const handleConfirmOrder = async () => {
    if (!paymentDetail.address || paymentDetail.paymentMethod.trim() === '') {
      message.warning('Vui lòng chọn địa chỉ giao hàng và phương thức thanh toán.');
      return;
    }

    setIsCheckingCode(true);
    try {
      const response = await handleAPI({
        url: '/order/create',
        method: 'post',
        data: {
          addressId: paymentDetail.address._id,
          paymentMethod: paymentDetail.paymentMethod,
          items: carts.map((item) => ({
            productId: item.productId,
            subProductId: item.subProductId,
            quantity: item.count,
            price: item.price,
            size: item.size,
            color: item.color,
          })),
          totalAmount: grandTotal,
        },
      });
      message.success('Đơn hàng đã được xác nhận thành công!');
      // Làm sạch giỏ hàng sau khi xác nhận
      dispatch(syncProducts([]));
      // Chuyển hướng hoặc reset trang theo nhu cầu
      router.push('/'); // Giả sử bạn có trang order-success
    } catch (error: any) {
      console.error(error);
      message.error(error.response?.data?.message || 'Đã có lỗi xảy ra khi xác nhận đơn hàng.');
    } finally {
      setIsCheckingCode(false);
    }
  };

  return (
    <div className='container-fluid'>
      <div className='container mt-4'>
        <HeadComponent title='Checkout' />
        <div className='row'>
          <div className='col-sm-12 col-md-8'>
            <div className='mb-4'>
              <Steps
                current={currentStep}
                labelPlacement='vertical'
                onChange={(val) => setCurrentStep(val)}
                items={[
                  {
                    title: 'Address',
                    icon: <HiHome size={18} />,
                  },
                  {
                    title: 'Payment Method',
                    icon: <BiCreditCard size={20} />,
                  },
                  {
                    title: 'Reviews',
                    icon: <FaStar size={18} />,
                  },
                ]}
              />
            </div>

            {renderComponents()}
          </div>
          <div className='col-sm-12 col-md-4 mt-5 '>
            <Card
              title='Subtotal'
              extra={
                <Typography.Title level={3} className='m-0'>
                  {VND.format(carts.reduce((a, b) => a + b.count * b.price, 0))}
                </Typography.Title>
              }>
              <div className='mt-3'>
                <Typography.Text type='secondary'>
                  Discount code
                </Typography.Text>
                <Space.Compact className='mb-3'>
                  <Input
                    size='large'
                    placeholder='code'
                    allowClear
                    value={discountCode}
                    onChange={(val) =>
                      setDiscountCode(val.target.value.toUpperCase())
                    }
                  />
                  <Button
                    loading={isCheckingCode}
                    onClick={handleCheckDiscountCode}
                    disabled={!discountCode}
                    type='primary'
                    size='large'>
                    Apply
                  </Button>
                </Space.Compact>
                <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                  <Typography.Text style={{ fontSize: 18 }}>
                    Discount:
                  </Typography.Text>
                  {discountValue && (
                    <Typography.Text
                      style={{
                        fontSize: 18,
                      }}>{`${discountValue?.value}${
                      discountValue?.type === 'percent' ? '%' : ''
                    }`}</Typography.Text>
                  )}
                </Space>
                <Divider />
                <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                  <Typography.Title level={4}>Grand Total:</Typography.Title>
                  <Typography.Title level={4}>{`${VND.format(
                    grandTotal
                  )}`}</Typography.Title>
                </Space>
              </div>
              <div className='mt-3'>
                {/* Nút xác nhận đơn hàng xuất hiện ở bước Reviews */}
                {currentStep === 2 && (
                  <Button
                    type='primary'
                    onClick={handleConfirmOrder}
                    loading={isCheckingCode}
                    size='large'
                    style={{ width: '100%' }}
                    disabled={carts.length === 0}>
                    Xác Nhận Đơn Hàng
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
