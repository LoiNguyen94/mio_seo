import { HomeOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import { IAddress } from '@nxseo/model';
import { SCREEN, useNavigation } from '@nxseo/function-shares';
export interface LocationItemProps {
  id?: number;
  type?: string;
  data?: IAddress;
}

export function LocationItem({ type, id, data }: LocationItemProps) {
  const { pushRaw } = useNavigation();
  return (
    <div
      style={{
        padding: '16px 16px 16px 16px',
        backgroundColor: 'white',
        marginBottom: 4,
      }}
    >
      <Row>
        <Col span={2}>
          <HomeOutlined
            style={{ fontSize: 15, color: '#7C7C7C', marginTop: 5 }}
          />
        </Col>
        <Col span={22}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: '#0F172A',
              }}
            >
              <span>{data?.delivery_name}</span>
              <span style={{ padding: '0px 5px' }}>-</span>
              <span>{data?.delivery_phone}</span>
            </div>
            {type !== 'default' && (
              <a>
                <div
                  onClick={() => {
                    pushRaw(`/location/edit?id=${data?.id}`);
                  }}
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#2979FF',
                    cursor: 'pointer',
                  }}
                >
                  Sửa
                </div>
              </a>
            )}
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: '#7C7C7C',
              margin: '8px 0px 11px 0px',
            }}
          >
            {data?.delivery_address}
          </div>
          <Row style={{ alignItems: 'center' }}>
            <Col xs={6} sm={4}>
              <div
                style={{
                  backgroundColor: 'rgba(236, 66, 97, 0.1)',
                  padding: '4px 9px',
                  borderRadius: 15,
                  fontSize: 10,
                  fontWeight: 500,
                  color: '#EC4261',
                  width: 'fit-content',
                }}
              >
                {data?.address_type_json?.name ?? 'Nhà riêng'}
              </div>
            </Col>
            {data?.is_default && (
              <Col xs={6} sm={4}>
                <div
                  style={{
                    borderRadius: 15,
                    fontSize: 12,
                    color: '#EC4261',
                    fontWeight: 500,
                  }}
                >
                  [Mặc định]
                </div>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default LocationItem;
