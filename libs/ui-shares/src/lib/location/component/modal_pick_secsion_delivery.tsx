import { Tabs } from 'antd';
import styles from './modal_fill_address.module.scss';
import { CloseOutlined } from '@ant-design/icons';
import {
  useWindowSize,
  chooseItemAddress,
  getListSessionDeliveryApi,
  handleResponse,
} from '@nxseo/function-shares';
import { ModalCustomBottom, Dividers } from '@nxseo/ui-shares';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
export interface ModalPickSecsionDeliveryProps {
  handle(): any;
}

const { TabPane } = Tabs;

export function ModalPickSecsionDelivery({
  // visibleParent = false,
  handle,
}: ModalPickSecsionDeliveryProps) {
  const { widthFixed, positionModal } = useWindowSize();
  const address = useSelector((state: any) => state['ItemAddress']);
  const dispath = useDispatch();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    getListSession();
  }, []);

  const getListSession = async () => {
    const res = await getListSessionDeliveryApi();
    handleResponse({
      res,
      success: () => {
        const list = res?.data?.data?.list;
        setData(list);
      },
      error: () => {},
    });
  };

  const chooseSessionDelivery = (item: any) => {
    dispath(
      chooseItemAddress({
        ...address,
        sessionDelivery: item,
      })
    );
    handle();
  };

  return (
    <ModalCustomBottom classname={'tab_custom_in_fill_address'}>
      <div
        style={{
          fontSize: 18,
          fontWeight: 500,
          textAlign: 'center',
          padding: '13px 0px',
        }}
      >
        Khung giờ giao hàng
      </div>
      <CloseOutlined
        onClick={handle}
        style={{
          fontSize: 18,
          color: '#0F172A',
          cursor: 'pointer',
          position: 'absolute',
          top: 18,
          right: 32,
        }}
      />
      <Dividers height="1" bottom="10" />
      {data.length > 0 &&
        data.map((item: any) => (
          <div
            className={
              styles[
                `${
                  address['sessionDelivery']?.id === item?.id
                    ? 'cont_item_active'
                    : 'cont_item'
                }`
              ]
            }
            onClick={() => chooseSessionDelivery(item)}
            key={item?.id}
            style={{ cursor: 'pointer' }}
          >
            <div
              className={
                styles[
                  `${
                    address['sessionDelivery']?.id === item?.id
                      ? 'item_active'
                      : 'item'
                  }`
                ]
              }
            >
              {item?.name}
            </div>
            <Dividers />
          </div>
        ))}
    </ModalCustomBottom>
  );
}

export default ModalPickSecsionDelivery;
