import { ImageList, SvgList, ModalCustomBottom } from '@nxseo/ui-shares';
import { useWindowSize } from '@nxseo/function-shares';
export interface ModalMoreInfoFreeshipProps {
  // visibleParent: boolean;
  data?: any;
  onClose(): any;
}

export function ModalMoreInfoFreeship({
  // visibleParent = false,
  data,
  onClose,
}: ModalMoreInfoFreeshipProps) {
  const { widthFixed, positionModal } = useWindowSize();

  return (
    <ModalCustomBottom>
      <div
      //   className={styles['p_27_24']}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: -75,
            marginBottom: 20,
            paddingRight: 10,
          }}
        >
          <div onClick={() => onClose()}>
            <SvgList.SvgClose />
          </div>
        </div>
        <div
          style={{
            backgroundColor: '#F6F6F6',
            borderRadius: '25px 25px 0px 0px',
            paddingBottom: 150,
          }}
        >
          <ImageList.BgDemo srcCustom="qwewweq" />
          <div
            style={{
              boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.1)',
              borderRadius: '6px',
              backgroundColor: 'white',
              paddingTop: 28,
              paddingBottom: 28,
              paddingLeft: 13,
              paddingRight: 13,
              marginTop: 23,
              marginLeft: 20,
              marginRight: 20,
              fontSize: 16,
            }}
          >
            <div style={{ fontWeight: 'bold' }}>Miễn phí giao hàng</div>
            <div>
              Hạn sử dụng: 30/04/2022 Điều kiện sử dụng:
              <br /> - Đơn hàng phải đạt giá trị từ 200.000đ
              <br />- Số lượng ưu đãi giới hạn mỗi ngày.
              <br /> - Không áp dụng đồng thời các chương trình ưu đãi khác.
            </div>
          </div>
        </div>
      </div>
    </ModalCustomBottom>
  );
}

export default ModalMoreInfoFreeship;
