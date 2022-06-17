import styles from './../Cart.module.scss';
import { useWindowSize, formatMoneyVND } from '@nxseo/function-shares';
import { ModalCustomBottom } from '@nxseo/ui-shares';
import Buttons from '../../commons/button';

export interface ModalMoreInfoFeeProps {
  // visibleParent: boolean;
  data?: any;
  onClose(): any;
}

export function ModalMoreInfoFee({
  // visibleParent = false,
  data,
  onClose,
}: ModalMoreInfoFeeProps) {
  const { widthFixed, positionModal } = useWindowSize();

  return (
    <ModalCustomBottom>
      <div className={styles['p_27_24']}>
        <div style={{ color: '0#000000', fontSize: 18, fontWeight: 600 }}>
          Phí áp dụng
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginTop: 17,
          }}
        >
          <div>
            <span style={{ color: '#929292', fontSize: 16, fontWeight: 600 }}>
              Phí vận chuyển{' '}
            </span>
            <br />
            <span style={{ color: '#929292', fontSize: 12, fontWeight: 400 }}>
              Miễn phí giao hàng cho đơn hàng trên 200k{' '}
            </span>
          </div>
          <div style={{ color: '#212121', fontSize: 16, fontWeight: 500 }}>
            {formatMoneyVND(20000)}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginTop: 17,
          }}
        >
          <div>
            <span style={{ color: '#929292', fontSize: 16, fontWeight: 600 }}>
              Phí dịch vụ{' '}
            </span>
            <br />
            <span style={{ color: '#929292', fontSize: 12, fontWeight: 400 }}>
              Phí hệ thống và dịch vụ khác{' '}
            </span>
          </div>
          <div style={{ color: '#212121', fontSize: 16, fontWeight: 500 }}>
            {formatMoneyVND(0)}
          </div>
        </div>
        <div style={{ marginTop: 27 }}>
          <Buttons
            handleClick={() => onClose()}
            title="Đã hiểu"
            bgColor="#EC4261"
          />
        </div>
      </div>
    </ModalCustomBottom>
  );
}

export default ModalMoreInfoFee;
