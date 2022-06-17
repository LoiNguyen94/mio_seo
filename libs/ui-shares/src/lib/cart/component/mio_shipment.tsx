import styles from './../Cart.module.scss';
import Buttons from './../../commons/button';
import dynamic from 'next/dynamic';

export interface CartMioShipmentProps {
  data?: any;
}

export function CartMioShipment({ data }: CartMioShipmentProps) {
  return (
    <div>
      <div
        style={{
          fontWeight: 700,
          color: '#576071',
          fontSize: 16,
          marginBottom: 12,
        }}
      >
        Thông tin giao hàng
      </div>
      <Buttons
        width="139px"
        borderRadius="6px"
        bgColor="#00A57B"
        title="Tạo địa chỉ"
        handleClick={() => console.log('sc')}
      />
    </div>
  );
}

// export default dynamic(() => Promise.resolve(CartMioShipment), { ssr: false });

export default CartMioShipment;
