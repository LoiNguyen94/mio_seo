import { WarningOutlined, PlusOutlined } from '@ant-design/icons';
import Item from '../component/item_list';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { IAddress } from '@nxseo/model';
import { SCREEN, useNavigation } from '@nxseo/function-shares';
export interface LocationListProps {
  id?: number;
}

export function LocationListScreen(props: LocationListProps) {
  const { push } = useNavigation();
  const addressList = useSelector((state: any) => state['address']);

  const [defaultAdd, setDefaultAdd] = useState();

  useEffect(() => {
    if (!addressList || Object.keys(addressList).length === 0) return;
    const defaultAddress = addressList.filter(
      (item: any) => item?.is_default === true
    );
    setDefaultAdd(defaultAddress ? defaultAddress[0] : '');
  }, [addressList]);

  return (
    <div style={{ marginTop: 85, paddingBottom: 85 }}>
      <div
        style={{
          fontSize: 16,
          fontWeight: 500,
          color: '#0F172A',
          padding: '16px 16px 9px 16px',
        }}
      >
        Địa chỉ giao hàng mặc định
      </div>
      {defaultAdd ? (
        <Item type={'default'} data={defaultAdd} />
      ) : (
        <div
          style={{ padding: '25px 16px 16px 16px', backgroundColor: 'white' }}
        >
          <div>
            <WarningOutlined style={{ fontSize: 15, color: '#7C7C7C' }} />
            <span
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: '#7C7C7C',
                marginLeft: 14,
              }}
            >
              Bạn chưa có địa chỉ mặc định{' '}
            </span>
          </div>
        </div>
      )}

      <div
        style={{
          fontSize: 16,
          fontWeight: 500,
          color: '#0F172A',
          padding: '25px 16px 9px 16px',
        }}
      >
        Địa chỉ đã lưu
      </div>

      {addressList &&
        Object.keys(addressList).length !== 0 &&
        addressList?.map((item: IAddress) => (
          <Item key={item.id} data={item} />
        ))}

      <div
        style={{
          fontSize: 16,
          fontWeight: 500,
          color: '#0F172A',
          padding: '16px 16px 9px 16px',
        }}
      >
        Thêm địa chỉ
      </div>
      <div
        onClick={() => push(SCREEN.add_new_address)}
        style={{ padding: '16px', backgroundColor: 'white' }}
      >
        <div style={{ cursor: 'pointer' }}>
          <PlusOutlined style={{ fontSize: 15, color: '#7C7C7C' }} />
          <span
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: '#7C7C7C',
              marginLeft: 14,
            }}
          >
            Thêm địa chỉ mới{' '}
          </span>
        </div>
      </div>
    </div>
  );
}
export default LocationListScreen;
