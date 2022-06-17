import { useState } from 'react';
import styles from './../Cart.module.scss';
import Buttons from './../../commons/button';
import dynamic from 'next/dynamic';
import { Radio, Space } from 'antd';

export interface CartMioPaymentTypeProps {
  data?: any;
}

export function CartMioPaymentType({ data }: CartMioPaymentTypeProps) {
  const [value, setValue] = useState(1);
  const [itemRadio] = useState([
    {
      id: 1,
      title: 'Tiền mặt',
    },
    {
      id: 2,
      title: 'Ví Mio',
    },
    {
      id: 3,
      title: 'Chuyển khoản',
    },
  ]);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className="payment_type">
      <div
        style={{
          fontWeight: 700,
          color: '#576071',
          fontSize: 16,
          marginBottom: 12,
        }}
      >
        Phương thức thanh toán
      </div>
      <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical">
          {itemRadio.map((item) => (
            <Radio
              key={item.id}
              style={{ color: '#576071', fontSize: 15 }}
              value={item.id}
            >
              {item.title}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  );
}

// export default dynamic(() => Promise.resolve(CartMioPaymentType), { ssr: false });

export default CartMioPaymentType;
