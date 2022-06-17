import styles from './common.module.scss';
import { Button, Input, Badge } from 'antd';
import { SvgList } from '@nxseo/ui-shares';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { IAddress } from '@nxseo/model';
import {
  SCREEN,
  signOut,
  useAppSelector,
  useNavigation,
  chooseItemAddress,
  initItemAddessState,
} from '@nxseo/function-shares';
export interface HeaderShortProps {
  title: string;
  keyPage?: string;
  subtitle?: string;
}

const HeaderShort = ({ title, subtitle, keyPage }: HeaderShortProps) => {
  const { goBack } = useNavigation();
  const dispatch = useDispatch();

  const handelBack = () => {
    switch (keyPage) {
      case 'add-edit-location': {
        dispatch(chooseItemAddress({ ...initItemAddessState }));
        break;
      }
      default:
        break;
    }
    goBack();
  };

  return (
    <div className={styles['container_header']} style={{ height: 90 }}>
      <div style={{ position: 'absolute', bottom: 11 }}>
        <Button
          onClick={() => handelBack()}
          style={{ backgroundColor: 'rgba(255,255,255,0)', border: 'none' }}
        >
          <SvgList.SvgLeftArrow />
        </Button>
      </div>
      <div className={styles['title']}>{title}</div>
    </div>
  );
};

export interface HeaderHomeProps {
  subtitle?: string;
}

const HeaderHome = ({ subtitle }: HeaderHomeProps) => {
  const { push, replaceScreen } = useNavigation();
  const dispatch = useDispatch();
  const addressList = useSelector((state: any) => state['address']);
  const token = useAppSelector((state) => state.auth?.token);

  const isAuth = token !== undefined;
  const [defaultAdd, setDefaultAdd] = useState<IAddress>();

  useEffect(() => {
    if (!addressList || Object.keys(addressList).length === 0) return;
    const defaultAddress = addressList.filter(
      (item: any) => item?.is_default === true
    );
    setDefaultAdd(defaultAddress.length > 0 ? defaultAddress[0] : '');
  }, [addressList]);

  const goToLocation = () => {
    if (isAuth) {
      push(SCREEN.location);
    }
  };
  return (
    <div className={styles['container_header_home']} style={{ height: 150 }}>
      <div className={styles['row_between_center']}>
        <div onClick={goToLocation} className={'click_effect'}>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#ffffff' }}>
            Giao tới
          </div>
          <div className={styles['row_center']}>
            <div
              className={styles['truncate_info_address_home']}
              style={{ fontSize: 12, color: '#ffffff' }}
            >
              {defaultAdd && isAuth
                ? defaultAdd?.delivery_address
                : 'Nhập địa chỉ của bạn'}
            </div>
            <SvgList.SvgPen />
          </div>
        </div>
        <div style={{ marginRight: 17 }} className={styles['row_center']}>
          <div
            className={'click_effect'}
            style={{ marginRight: 20 }}
            onClick={() => { 
                dispatch(signOut(''))
                replaceScreen(SCREEN.root)
              }}
          >
            <Badge size="default" count={0}>
              <SvgList.SvgBell />
            </Badge>
          </div>
          <div className={'click_effect'} onClick={() => push(SCREEN.login)}>
            <Badge size="default" count={10}>
              <SvgList.SvgCart />
            </Badge>
          </div>
        </div>
      </div>
      <Input
        className={styles['p_12_16']}
        style={{ marginTop: 10, border: 'none', borderRadius: 8 }}
        prefix={<SvgList.SvgSearch />}
        placeholder={'Tìm theo tên sản phẩm'}
      />
    </div>
  );
};

export interface HeaderProps {
  type?: string;
  title: string;
  subtitle?: string;
  keyPage?: string;
}

export function Header(props: HeaderProps) {
  const { title, subtitle, type, keyPage } = props;
  return type === 'TabMio' ? (
    <HeaderHome />
  ) : (
    <HeaderShort title={title} keyPage={keyPage} />
  );
}

export default Header;
