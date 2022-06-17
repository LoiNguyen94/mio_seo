import { DownOutlined, CloseOutlined } from '@ant-design/icons';
import { Input, Switch } from 'antd';
import styles from './../add.module.scss';
import {
  ModalFillAddress,
  Buttons,
  PageMap,
  LocationType,
  ToastLoading,
  TypeToastifyLoading,
} from '@nxseo/ui-shares';
import { getLocationGeoApi, useNavigation } from '@nxseo/function-shares';
import { useState, useRef, useEffect } from 'react';
import { useWindowSize, chooseItemAddress } from '@nxseo/function-shares';
import { useDispatch, useSelector } from 'react-redux';

export interface FillNewAddressProps {
  id?: number;
}

export function FillNewAddressScreen(props: FillNewAddressProps) {
  const { widthFixed } = useWindowSize();
  const dispath = useDispatch();
  const refToastifyLoading = useRef<TypeToastifyLoading>();
  const input = useRef(null);
  const { goBack } = useNavigation();
  const address = useSelector((state: any) => state['ItemAddress']);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getLatLng();
  }, [address['ward']]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getLatLng();
    }, 2200);

    // if this effect run again, because `value` changed, we remove the previous timeout
    return () => clearTimeout(timeout);
  }, [address['other']]);

  const getLatLng = async () => {
    if (
      (address['city'], address['ward'] && address['dist'] && address['other'])
    ) {
      // refToastifyLoading.current?.show('Đang xử lý');
      const res = await getLocationGeoApi(
        address['other'] +
          ', ' +
          address['ward']?.name +
          ', ' +
          address['dist']?.name +
          ', ' +
          address['city']?.name
      );
      if (res?.data?.status?.code === 200) {
        // refToastifyLoading.current?.success('Hoàn tất', '');
        const data = res?.data?.data;
        dispath(
          chooseItemAddress({
            ...address,
            lat: data?.geometry?.location?.lat,
            lng: data?.geometry?.location?.lng,
          })
        );
      }
    }
  };

  const onLocationChange = ({ latitude, longitude }: LocationType) => {
    dispath(
      chooseItemAddress({
        ...address,
        lat: latitude,
        lng: longitude,
      })
    );
  };

  const handleChangeInput = (e: any) => {
    const { value } = e.target;
    dispath(
      chooseItemAddress({
        ...address,
        confirmLocation: '',
        other: value,
      })
    );
  };

  const clearInput = () => {
    dispath(
      chooseItemAddress({
        ...address,
        confirmLocation: '',
        other: '',
      })
    );
    // @ts-ignore
    input.current.focus();
  };

  const confirmLocate = () => {
    dispath(
      chooseItemAddress({
        ...address,
        confirmLocation: 'exactly',
      })
    );
    goBack();
  };

  return (
    <div style={{ marginTop: 85, paddingBottom: 125 }}>
      <div className={styles['container_item']}>Địa chỉ</div>

      <Input
        ref={input}
        bordered={false}
        style={{
          color: '#0F172A',
          backgroundColor: '#ffffff',
          padding: '9px 16px 9px 16px',
        }}
        allowClear={{
          clearIcon: (
            <CloseOutlined
              style={{ fontSize: 11, color: '#0F172A', cursor: 'pointer' }}
            />
          ),
        }}
        placeholder={'Số nhà, tên đường'}
        onChange={handleChangeInput}
        value={address['other']}
      />

      <div
        onClick={() => setVisible(true)}
        style={{ marginTop: 4 }}
        className={`${styles['title_item']} ${styles['row_between_center']}`}
      >
        {address['city'] && address['ward'] && address['dist'] ? (
          <span style={{ color: '#0F172A' }}>
            {address['ward']?.name +
              ', ' +
              address['dist']?.name +
              ', ' +
              address['city']?.name}
          </span>
        ) : (
          <span>Phường/Xã - Quận/Huyện - Tỉnh/Thành phố</span>
        )}

        <span>
          <DownOutlined
            style={{ fontSize: 11, color: '#0F172A', cursor: 'pointer' }}
          />
        </span>
      </div>

      {address['lat'] && address['lng'] ? (
        <>
          <div className={styles['container_item']}>Vị trí trên bản đồ</div>
          <PageMap
            active={true}
            defaultMarker={{
              latitude: parseFloat(address['lat']),
              longitude: parseFloat(address['lng']),
            }}
            onLocationChange={onLocationChange}
          />

          <div
            style={{
              padding: '16px 17px 34px 17px',
              backgroundColor: '#FFFFFF',
              position: 'fixed',
              bottom: 0,
              width: widthFixed,
              zIndex: 100,
            }}
          >
            <Buttons
              title="Xác nhận vị trí"
              handleClick={confirmLocate}
              bgColor={'#EC4261'}
              titleColor={'#FFFFFF'}
            />
          </div>
        </>
      ) : null}

      {visible && <ModalFillAddress handle={() => setVisible(false)} />}
      {/* @ts-ignored */}
      <ToastLoading ref={refToastifyLoading} />
    </div>
  );
}
export default FillNewAddressScreen;
