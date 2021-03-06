import { DownOutlined, CloseOutlined } from '@ant-design/icons';
import { Input, Switch } from 'antd';
import styles from './add.module.scss';
import {
  Buttons,
  ModalPickSecsionDelivery,
  ModalWarningDefault,
  ModalConfirmDelete,
  ToastLoading,
  TypeToastifyLoading,
  ErrorOneLine,
} from '@nxseo/ui-shares';
import { useDispatch, useSelector } from 'react-redux';
import {
  useWindowSize,
  _validPhone,
  _validLenghtName,
  chooseItemAddress,
  createAddressDeliveryApi,
  updateAddressDeliveryApi,
  deletetAddressDeliveryApi,
  fetchListAddressConfig,
  initItemAddessState,
  makeDataCreateAddress,
  makeDataCallBackAddress,
} from '@nxseo/function-shares';
import FilledAddress from '../component/add/filled_address';
import { useState, useRef, useEffect } from 'react';
export interface LocationProps {
  id?: string;
  type?: string;
}

export function LocationScreen(props: LocationProps) {
  const { id, type } = props;
  const address = useSelector((state: any) => state['ItemAddress']);
  const listAddress = useSelector((state: any) => state['address']);
  const dispatch = useDispatch();
  const refToastifyLoading = useRef<TypeToastifyLoading>();
  const [visibleSecsionDelivery, setVisibleSecsionDelivery] = useState(false);
  const [visibleWarningDefault, setVisibleWarningDefault] = useState(false);
  const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false);
  const [done, setDone] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState({
    nameInfo: '',
    phoneInfo: '',
  });
  const { widthFixed } = useWindowSize();

  useEffect(() => {
    if (type === 'edit') {
      if (
        !listAddress ||
        Object.values(address).every((i) => i && i !== '' && i !== NaN)
      )
        return;
      const callBackAddress = listAddress.filter(
        (data: any) => data?.id.toString() === id
      );
      const callBackData = makeDataCallBackAddress(callBackAddress[0]);
      dispatch(chooseItemAddress({ ...callBackData }));
    }
  }, [id]);

  useEffect(() => {
    if (
      !Object.values(address).every((i) => i !== '' && i !== NaN) ||
      Object.values(error).some((i) => i !== '')
    )
      setDone(false);
    else setDone(true);
  }, [address]);

  const itemsInput = [
    {
      id: 1,
      name: 'name',
      placeHolder: 'H??? v?? t??n',
      keyError: 'nameInfo',
      type: 'text',
    },
    {
      id: 2,
      name: 'phone',
      placeHolder: 'S??? ??i???n tho???i',
      keyError: 'phoneInfo',
      type: 'number',
    },
  ];
  const itemTypeAddress = [
    {
      id: 1,
      name: 'Nh?? ri??ng',
    },
    {
      id: 2,
      name: 'V??n ph??ng',
    },
  ];

  const createAddress = async () => {
    if (!done || processing) return;
    setProcessing(true);
    refToastifyLoading.current?.show('??ang x??? l??');
    const addressParam = makeDataCreateAddress(address);
    try {
      const res = await createAddressDeliveryApi(addressParam);
      if (res?.data?.status.code === 200) {
        fetchListAddressConfig();
        dispatch(chooseItemAddress({ ...initItemAddessState }));
        refToastifyLoading.current?.success('Th??nh c??ng', 'back');
      } else {
        refToastifyLoading.current?.fail('T???o kh??ng th??nh c??ng');
        setProcessing(false);
      }
    } catch (err) {
      refToastifyLoading.current?.fail(
        err?.response?.data?.message ?? 'T???o kh??ng th??nh c??ng'
      );
      setProcessing(false);
    }
  };

  const requestDeleteAddress = async () => {
    if (processing) return;
    if (address['default']) {
      setVisibleWarningDefault(true);
      return;
    }
    setVisibleConfirmDelete(true);
  };

  const deleteAddress = async () => {
    if (processing) return;
    setProcessing(true);
    refToastifyLoading.current?.show('??ang x??? l??');
    setVisibleConfirmDelete(false);
    try {
      const res = await deletetAddressDeliveryApi(id + '');
      if (res?.data?.status.code === 200) {
        fetchListAddressConfig();
        dispatch(chooseItemAddress({ ...initItemAddessState }));
        refToastifyLoading.current?.success('Th??nh c??ng', 'back');
      } else {
        refToastifyLoading.current?.fail('X??a kh??ng th??nh c??ng');
        setProcessing(false);
      }
    } catch (err) {
      refToastifyLoading.current?.fail(
        err?.response?.data?.message ?? 'X??a kh??ng th??nh c??ng'
      );
      setProcessing(false);
    }
  };

  const updateAddress = async () => {
    if (!done || processing) return;
    setProcessing(true);
    refToastifyLoading.current?.show('??ang x??? l??');
    const getParamAddress = makeDataCreateAddress(address);
    const addressParam = { ...getParamAddress, id: parseInt(id!) };
    try {
      const res = await updateAddressDeliveryApi(addressParam);
      console.log(res);
      if (res?.data?.status.code === 200) {
        fetchListAddressConfig();
        dispatch(chooseItemAddress({ ...initItemAddessState }));
        refToastifyLoading.current?.success('Th??nh c??ng', 'back');
      } else {
        refToastifyLoading.current?.fail('S???a ?????a ch??? kh??ng th??nh c??ng');
        setProcessing(false);
      }
    } catch (err) {
      refToastifyLoading.current?.fail(
        err?.response?.data?.message ?? 'S???a ?????a ch??? kh??ng th??nh c??ng'
      );
      setProcessing(false);
    }
  };

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        dispatch(chooseItemAddress({ ...address, name: value }));
        setError({
          ...error,
          nameInfo: _validLenghtName(value, 3),
        });
        break;
      case 'phone':
        dispatch(chooseItemAddress({ ...address, phone: value }));
        setError({ ...error, phoneInfo: _validPhone(value) });
        break;
    }
  };

  const chooseTypeAddress = (item: any) => {
    dispatch(chooseItemAddress({ ...address, typeAddress: item }));
  };

  const handleSwitchDefault = (e: any) => {
    dispatch(chooseItemAddress({ ...address, default: e }));
  };

  return (
    <div
      style={{
        marginTop: 85,
        paddingBottom: type === 'edit' ? 0 : 125,
      }}
    >
      <div className={styles['container_item']}>Th??ng tin li??n h???</div>
      {itemsInput.map((item) => (
        <div key={item.id}>
          <div
            style={{
              padding: '8px 16px 8px 16px',
              backgroundColor: 'white',
              marginBottom: 4,
            }}
          >
            <Input
              name={item.name}
              value={address[item.name]}
              bordered={false}
              style={{ color: '#0F172A', padding: 0 }}
              placeholder={item.placeHolder}
              type={item.type}
              onChange={handleChangeInput}
              allowClear={{
                clearIcon: (
                  <CloseOutlined
                    style={{
                      fontSize: 11,
                      color: '#0F172A',
                      cursor: 'pointer',
                    }}
                  />
                ),
              }}
              onWheel={(event) => event.currentTarget.blur()}
            />
          </div>
          {/* @ts-ignored */}
          <ErrorOneLine content={error[`${item.keyError}`]} />
        </div>
      ))}

      <div className={styles['container_item']}>?????a ch???</div>
      <FilledAddress data={address} />

      <div className={styles['container_item']}>Khung gi??? giao h??ng</div>
      <div
        onClick={() => setVisibleSecsionDelivery(true)}
        style={{}}
        className={`${styles['title_item']} ${styles['row_between_center']}`}
      >
        {address['sessionDelivery'] ? (
          <span>{address['sessionDelivery']?.name}</span>
        ) : (
          <span>Giao h??ng ti??u chu???n</span>
        )}
        <span>
          <DownOutlined style={{ fontSize: 11, color: '#0F172A' }} />
        </span>
      </div>

      <div className={styles['container_item']}>C??i ?????t</div>
      <div
        style={{ marginBottom: 4 }}
        className={`${styles['title_item']} ${styles['row_between_center']}`}
      >
        <span>Lo???i ?????a ch???</span>
        <div className={`${styles['row_between_center']}`}>
          {itemTypeAddress.map((item) => (
            <div
              onClick={() => chooseTypeAddress(item)}
              className={styles['type_location_item']}
              key={item.id}
              style={{
                color:
                  address['typeAddress']?.id === item.id
                    ? '#EC4261'
                    : '#7C7C7C',
                border: `1px solid ${
                  address['typeAddress']?.id === item.id ? '#EC4261' : '#7C7C7C'
                }`,
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{}}
        className={`${styles['title_item']} ${styles['row_between_center']}`}
      >
        <span>?????t l??m ?????a ch??? m???c ?????nh</span>
        <Switch
          className="switch_custom_color"
          checked={address['default']}
          onChange={handleSwitchDefault}
        />
      </div>
      <ErrorOneLine
        content={
          !listAddress && !address['default']
            ? 'Ch???n ??t nh???t m???t ?????a ch??? l??m ?????a ch??? giao h??ng m???c ?????nh.'
            : ''
        }
      />
      {type === 'edit' ? (
        <div
          style={{
            marginTop: 40,
            padding: '16px 17px 34px 17px',
            backgroundColor: '#FFFFFF',
            // position: 'fixed',
            bottom: 0,
            width: widthFixed,
          }}
        >
          <Buttons
            title="X??a ?????a ch???"
            handleClick={() => requestDeleteAddress()}
            bgColor={'#FFFFFF'}
            filter={'none'}
            titleColor={'#EC4261'}
          />
          <Buttons
            title="L??u thay ?????i"
            handleClick={() => updateAddress()}
            bgColor={done ? '#EC4261' : '#B6B6B6'}
            titleColor={'#FFFFFF'}
          />
        </div>
      ) : (
        <div
          style={{
            marginTop: 40,
            padding: '16px 17px 34px 17px',
            backgroundColor: '#FFFFFF',
            position: 'fixed',
            bottom: 0,
            width: widthFixed,
          }}
        >
          <Buttons
            title="L??u"
            handleClick={() => createAddress()}
            bgColor={done ? '#EC4261' : '#B6B6B6'}
            titleColor={'#FFFFFF'}
          />
        </div>
      )}

      {visibleSecsionDelivery && (
        <ModalPickSecsionDelivery
          handle={() => setVisibleSecsionDelivery(false)}
        />
      )}
      {visibleWarningDefault && (
        <ModalWarningDefault handle={() => setVisibleWarningDefault(false)} />
      )}
      {visibleConfirmDelete && (
        <ModalConfirmDelete
          handle={() => setVisibleConfirmDelete(false)}
          confirm={deleteAddress}
        />
      )}
      {/* @ts-ignored */}
      <ToastLoading ref={refToastifyLoading} />
    </div>
  );
}
export default LocationScreen;
