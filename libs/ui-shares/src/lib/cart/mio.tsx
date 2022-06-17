import styles from './Cart.module.scss';

import { Dividers } from './../commons/divider';
import MioItem from './component/mio_item';
import MioTagFreeship from './component/mio_tag_freeship';
import MioPromotion from './component/mio_promotion';
import MioMoneySummmary from './component/mio_money_summary';
import MioShipmenty from './component/mio_shipment';
import MioPaymentType from './component/mio_payment_type';
import MioPaymentInfo from './component/mio_partner_info';
import MioTotal from './component/mio_total';
export interface CartMioProps {
  data?: any;
}

export function CartMio({ data }: CartMioProps) {
  return (
    <div style={{ marginTop: 55 }}>
      <div
        className={`${styles['p_12_20']}`}
        style={{ backgroundColor: '#F4F6F8' }}
      >
        <MioTagFreeship />
      </div>
      <div className={`${styles['p_12_20']}`}>
        <MioItem />
      </div>
      <div className={`${styles['p_0_20']}`}>
        <MioPromotion />
      </div>
      <div className={`${styles['p_0_20']}`}>
        <MioMoneySummmary />
      </div>
      <Dividers height="4" top="20" bottom="8" />
      <div className={`${styles['p_0_20']}`}>
        <MioShipmenty />
      </div>
      <Dividers height="4" top="20" bottom="8" />
      <div className={`${styles['p_0_20']}`}>
        <MioPaymentType />
      </div>
      <Dividers height="4" top="20" bottom="8" />
      <div className={`${styles['p_0_20_20_20']}`}>
        <MioPaymentInfo />
      </div>
      <div className={`${styles['p_14_20_20_20']}`}>
        <MioTotal />
      </div>
    </div>
  );
}

export default CartMio;

// export default Cart;
