import styles from './../Cart.module.scss';
import { AdjustedQuantity, Dividers } from '@nxseo/ui-shares';
import { Row, Col } from 'antd';
import Image from 'next/image';
import { imageLoader } from '@nxseo/function-shares';

export interface CartMioItemProps {
  data?: any;
}

export function CartMioItem({ data }: CartMioItemProps) {
  const RenderItem = () => {
    return (
      <div style={{ marginBottom: 22 }}>
        <div className={styles['row_between_center']}>
          <Image
            loader={imageLoader}
            alt="alt"
            src={
              'https://cdn.itaphoa.com/photos/de99fd6b7ff717d6afdab779186b51a4.jpg'
            }
            width={80}
            height={81}
            priority
          />
          <div
            style={{
              width: '80%',
              height: 81,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, color: '#020202' }}>
              Thăn cổ bò Úc nhập khẩu (đông lạnh) - Túi 250gr
            </div>
            <div className={styles['row_between_center']}>
              <div>
                <div style={{ fontSize: 12, color: '#798395' }}>Gói 250gr</div>
                <div
                  style={{ fontSize: 13, color: '#29313F', fontWeight: 600 }}
                >
                  Gói 250gr
                </div>
              </div>
              <AdjustedQuantity />
            </div>
          </div>
        </div>
        <Dividers top="13" />
      </div>
    );
  };
  return (
    <div>
      <RenderItem />
    </div>
  );
}

export default CartMioItem;

// export default Cart;
