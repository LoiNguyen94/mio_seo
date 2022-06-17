import styles from './../Cart.module.scss';
import { formatMoneyVND } from '@nxseo/function-shares';
import { Slider } from 'antd';
import { SvgList } from '@nxseo/ui-shares';
import MioItem from './mio_item';

export interface CartMioTagpromotionProps {
  data?: any;
}

export function CartMioTagpromotion({ data }: CartMioTagpromotionProps) {
  return (
    <div
      className={styles['row_between_center']}
      style={{
        backgroundColor: '#DEF5EF',
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 14,
        paddingLeft: 14,
        width: '100%',
        borderRadius: 8,
        cursor: 'pointer',
      }}
    >
      <div className={styles['row_center']}>
        <SvgList.SvgPromoTicket />
        <div style={{ marginLeft: 14 }}>
          <div style={{ fontSize: 13, color: '#00986F', fontWeight: 700 }}>
            Ưu đãi
          </div>
          <div style={{ fontSize: 12, color: '#8B8B8B' }}>
            Bạn có
            {3} mã giảm giá
          </div>
        </div>
      </div>
      <SvgList.SvgRightArrow />
    </div>
  );
}

export default CartMioTagpromotion;

// export default Cart;
