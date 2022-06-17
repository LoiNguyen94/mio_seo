import { useWindowSize } from '@nxseo/function-shares';
import { Buttons } from '@nxseo/ui-shares';
import { Modal } from 'antd';

export interface ModalWarningDefaultProps {
  handle(): any;
}

export function ModalWarningDefault({
  // visibleParent = false,
  handle,
}: ModalWarningDefaultProps) {
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
        Không thể xoá
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
        Bạn không thể xoá địa chỉ mặc định. Vui lòng chọn một địa chỉ khác làm
        địa chỉ mặc định nếu muốn xoá địa chỉ này.
      </div>
      <Buttons
        title="Đã hiểu"
        handleClick={handle}
        bgColor={'#EC4261'}
        titleColor={'#FFFFFF'}
      />
    </Modal>
  );
}

export default ModalWarningDefault;
