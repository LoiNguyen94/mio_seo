import styles from './../Cart.module.scss';
import { Row, Col, Input } from 'antd';
import { formatMoneyVND } from '@nxseo/function-shares';
import { SvgList } from '@nxseo/ui-shares';
import ModalMoreInfoFee from './modal_more_info_fee';
import { useState } from 'react';

export interface CartMioMoneySummaryProps {
  data?: any;
}

export function CartMioMoneySummary({ data }: CartMioMoneySummaryProps) {
  const [visibleModalMoreInfoFee, setVisibleModalMoreInfoFee] = useState(false);
  return (
    <div style={{ marginTop: 24 }}>
      <Row>
        <Col className={styles['money_summary_item_padding_bottom']} span={12}>
          <div className={styles['money_summary_text_title_item']}>
            Tạm tính
          </div>
        </Col>
        <Col
          className={styles['money_summary_item_padding_bottom']}
          style={{ display: 'flex', justifyContent: 'flex-end' }}
          span={12}
        >
          <div className={styles['money_summary_text_money']}>
            {formatMoneyVND(12000)}
          </div>
        </Col>
        <Col
          className={styles['money_summary_item_padding_bottom']}
          style={{ display: 'flex', alignItems: 'center' }}
          span={12}
        >
          <div
            style={{ marginRight: 10 }}
            className={styles['money_summary_text_title_item']}
          >
            Phí áp dụng
          </div>
          <div onClick={() => setVisibleModalMoreInfoFee(true)}>
            <SvgList.SvgMoreInfo />
          </div>
        </Col>
        <Col style={{ display: 'flex', justifyContent: 'flex-end' }} span={12}>
          <div className={styles['money_summary_text_money']}>
            {formatMoneyVND(12000)}
          </div>
        </Col>
        <Col span={12}>
          <div className={styles['money_summary_text_title_item']}>
            Giảm giá
          </div>
        </Col>
        <Col style={{ display: 'flex', justifyContent: 'flex-end' }} span={12}>
          <div className={styles['money_summary_text_money']}>
            {formatMoneyVND(12000)}
          </div>
        </Col>
      </Row>
      <div>
        <div
          style={{
            fontWeight: 700,
            color: '#576071',
            fontSize: 14,
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          Ghi chú:
        </div>
        <div
          style={{
            backgroundColor: '#F7F9FB',
            borderRadius: 11,
            padding: 10,
          }}
        >
          <Input
            style={{ backgroundColor: '#F7F9FB', border: 'none' }}
            placeholder={'Ghi chú đơn hàng'}
          />
        </div>
      </div>
      {visibleModalMoreInfoFee && (
        <ModalMoreInfoFee onClose={() => setVisibleModalMoreInfoFee(false)} />
      )}
    </div>
  );
}

export default CartMioMoneySummary;

// export default Cart;
