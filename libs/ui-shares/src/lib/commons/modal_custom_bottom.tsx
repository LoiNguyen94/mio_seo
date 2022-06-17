import { Modal } from 'antd';
import { useWindowSize } from '@nxseo/function-shares';

export interface ModalCustomBottomProps {
  children?: React.ReactNode;
  classname?: string;
}

export function ModalCustomBottom({
  children,
  classname,
}: ModalCustomBottomProps) {
  const { widthFixed, positionModal } = useWindowSize();
  return (
    <Modal
      wrapClassName={`custom_modal_bottom ${classname}`}
      bodyStyle={{
        width: '100%',
        bottom: 0,
        borderRadius: '12px 12px 0px 0px',
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 20,
        paddingLeft: 0,
      }}
      maskStyle={{
        width: widthFixed,
        left: positionModal,
        right: positionModal,
      }}
      width={widthFixed}
      maskClosable={true}
      footer={false}
      closable={false}
      // mask={false}
      transitionName=""
      visible={true}
    >
      {children}
    </Modal>
  );
}

export default ModalCustomBottom;
