import { Button, Modal, Row, Col } from 'antd';
import styles from './product.module.scss';
import { useWindowSize } from '@nxseo/function-shares';
import { SvgList, ModalCustomBottom } from '@nxseo/ui-shares';

export interface ModalDetailInfoProps {
  // visibleParent: boolean;
  content: string;
  handle(): any;
}

export function ModalDetailInfo({
  // visibleParent = false,
  content,
  handle,
}: ModalDetailInfoProps) {
  const fakeData = ['Giá rẻ nhất', 'Giao trong 24h'];
  const { widthFixed, positionModal } = useWindowSize();

  return (
    <ModalCustomBottom>
      <div className={styles['p_27_25_0_20']}>
        <div style={{ position: 'absolute' }}>
          <Button
            onClick={() => {
              handle();
            }}
            style={{
              backgroundColor: 'rgba(255,255,255,0)',
              border: 'none',
              padding: 0,
            }}
          >
            <SvgList.SvgXmark />
          </Button>
        </div>
        <div
          className={styles['title']}
          style={{ color: '#29313F', fontSize: 16 }}
        >
          Thông tin sản phẩm
        </div>
        <Row style={{ fontSize: 14, marginTop: 20 }} gutter={[10, 10]}>
          {fakeData.map((item, index) => (
            <Col key={index} className={styles['row_center']} span={8}>
              <SvgList.SvgTickVCustom />
              <div style={{ fontSize: 14, color: '#00A57B', marginLeft: 5 }}>
                {item}
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <div className={styles['p_0_20']}>
        {content ? (
          <div style={{ marginTop: 20, color: '#798395' }}>{content}</div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            Không có thông tin tương ứng
          </div>
        )}
      </div>
    </ModalCustomBottom>
  );
}

export default ModalDetailInfo;
