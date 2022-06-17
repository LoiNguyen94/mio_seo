import styles from './../Cart.module.scss';
import { Row, Col } from 'antd';
import Buttons from '../../commons/button';
import { formatMoneyVND } from '@nxseo/function-shares';

export interface CartMioTotalProps {
  data?: any;
}

export function CartMioTotal({ data }: CartMioTotalProps) {
  return (
    <div>
      <Row>
        <Col span={12}>
          <div
            style={{
              fontWeight: 400,
              color: '#576071',
              fontSize: 12,
            }}
          >
            Tổng thanh toán
          </div>
          <div className={styles['total_text_money']}>
            {formatMoneyVND(12000)}
          </div>
        </Col>
        <Col span={12}>
          <Buttons
            handleClick={() => console.log(true)}
            title="Mua hàng"
            bgColor="#EC4261"
          />
        </Col>
      </Row>
    </div>
  );
}

// export default dynamic(() => Promise.resolve(CartMioTotal), { ssr: false });

export default CartMioTotal;
