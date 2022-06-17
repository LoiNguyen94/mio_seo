import { useWindowSize } from '@nxseo/function-shares';
import { Buttons } from '@nxseo/ui-shares';
import { Modal, Row, Col } from 'antd';

export interface ModalConfirmDeleteProps {
  handle(): any;
  confirm(): any;
}

export function ModalConfirmDelete({
  // visibleParent = false,
  handle,
  confirm,
}: ModalConfirmDeleteProps) {
  const { widthFixed, positionModal } = useWindowSize();

  return (
    <Modal
      centered={true}
      bodyStyle={{
        width: '100%',
        borderRadius: 8,
      }}
      width={widthFixed - 60}
      maskClosable={true}
      footer={false}
      closable={false}
      transitionName=""
      visible={true}
    >
      <div
        style={{
          fontSize: 16,
          color: '#0F172A',
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        Xác nhận xoá
      </div>
      <div
        style={{
          fontSize: 14,
          color: '#7C7C7C',
          fontWeight: 400,
          textAlign: 'center',
          padding: '10px 10px 15px 10px',
        }}
      >
        Địa chỉ này sẽ không được khôi phục khi xoá.
      </div>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Buttons
            title="Hủy"
            handleClick={handle}
            border={'1px solid #EC4261'}
            filter={'none'}
            bgColor={'#FFFFFF'}
            titleColor={'#EC4261'}
          />
        </Col>
        <Col span={12}>
          <Buttons
            title="Đồng ý"
            handleClick={confirm}
            filter={'none'}
            bgColor={'#EC4261'}
            titleColor={'#FFFFFF'}
          />
        </Col>
      </Row>
    </Modal>
  );
}

export default ModalConfirmDelete;
