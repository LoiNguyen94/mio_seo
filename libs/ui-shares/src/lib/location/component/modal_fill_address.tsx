import { useState, useEffect } from 'react';
import { useEffectOnce } from 'react-use';
import { Tabs } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { ModalCustomBottom, Dividers } from '@nxseo/ui-shares';
import ItemFillAddress from './item_fill_address';
import {
  getProvincesApi,
  getDistrictsApi,
  getWardsApi,
  handleResponse,
  chooseItemAddress,
} from '@nxseo/function-shares';
import { IProvince, IDistrict, IWard } from '@nxseo/model';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
export interface ModalFillAddressProps {
  handle(): any;
}

const { TabPane } = Tabs;

export function ModalFillAddress({
  // visibleParent = false,
  handle,
}: ModalFillAddressProps) {
  const [tab, setTab] = useState<string>('1');
  const [snapShot, setSnapShot] = useState<any>();
  const [provinces, setProvinces] = useState<IProvince[]>();
  const [districts, setDistricts] = useState<IDistrict[]>();
  const [wards, setWards] = useState<IWard[]>();
  const dispath = useDispatch();
  const address = useSelector((state: any) => state['ItemAddress']);

  useEffectOnce(() => {
    getProvinces();
    setSnapShot([address['city'], address['dist'], address['ward']]);
  });

  useEffect(() => {
    if (!address['city']['id']) return;
    setTab('2');
    getDistricts(address['city']['id']);
  }, [address['city']]);

  useEffect(() => {
    if (!address['dist']['id']) return;
    setTab('3');
    getWards(address['dist']['id']);
  }, [address['dist']]);

  const getProvinces = async () => {
    const res = await getProvincesApi();
    handleResponse({
      res,
      success: (res) => {
        const data = res?.data?.data;
        setProvinces(data?.list);
      },
      error: () => {
        toast.error('Có lỗi xảy ra');
      },
    });
  };

  const getDistricts = async (idProvince: string) => {
    const res = await getDistrictsApi(idProvince);
    handleResponse({
      res,
      success: (res) => {
        const data = res?.data?.data;
        setDistricts(data?.list);
      },
      error: () => {
        toast.error('Có lỗi xảy ra');
      },
    });
  };

  const getWards = async (idDistrict: string) => {
    const res = await getWardsApi(idDistrict);
    handleResponse({
      res,
      success: (res) => {
        const data = res?.data?.data;
        setWards(data?.list);
      },
      error: () => {
        toast.error('Có lỗi xảy ra');
      },
    });
  };

  const toggleClose = () => {
    dispath(
      chooseItemAddress({
        ...address,
        city: snapShot[0],
        dist: snapShot[1],
        ward: snapShot[2],
      })
    );
    handle();
  };

  function callback(key: any) {
    setTab(key);
  }

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
        Địa chỉ nhận hàng
      </div>
      <CloseOutlined
        onClick={toggleClose}
        style={{
          fontSize: 18,
          color: '#0F172A',
          cursor: 'pointer',
          position: 'absolute',
          top: 18,
          right: 32,
        }}
      />
      <Dividers height="2" />

      <Tabs
        style={{ display: 'flex', justifyContent: 'space-around' }}
        centered={true}
        defaultActiveKey={'1'}
        activeKey={tab}
        onChange={callback}
      >
        <TabPane tab="Tỉnh/Thành" key="1">
          <ItemFillAddress type={'city'} data={provinces} />
        </TabPane>
        <TabPane disabled={!address['city']} tab="Quận/Huyện" key="2">
          <ItemFillAddress type={'dist'} data={districts} />
        </TabPane>
        <TabPane disabled={!address['dist']} tab="Phường/Xã" key="3">
          <ItemFillAddress
            type={'ward'}
            data={wards}
            handleCloseModal={handle}
          />
        </TabPane>
      </Tabs>
    </ModalCustomBottom>
  );
}

export default ModalFillAddress;
