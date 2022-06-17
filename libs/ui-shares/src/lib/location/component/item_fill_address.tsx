import { Input } from 'antd';
import styles from './modal_fill_address.module.scss';
import { useWindowSize, chooseItemAddress } from '@nxseo/function-shares';
import { SvgList, Dividers } from '@nxseo/ui-shares';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export interface ItemFillAddressProps {
  type?: string;
  data?: any;
  handleCloseModal?: () => void;
}

export function ItemFillAddress({
  type = 'city',
  data,
  handleCloseModal,
}: ItemFillAddressProps) {
  const { widthFixed, positionModal } = useWindowSize();
  const dispath = useDispatch();
  const address = useSelector((state: any) => state['ItemAddress']);

  const [focus, setFocus] = useState(false);
  // const [areaMouse, setAreaMouse] = useState(false);
  const [keySearch, setKeySearch] = useState('');
  const [items, setItems] = useState([]);
  const [itemsShow, setItemsShow] = useState([]);

  const placeholder =
    type === 'city'
      ? 'Tìm kiếm Tỉnh hoặc Thành phố'
      : type === 'dist'
      ? 'Tìm kiếm Quận hoặc Huyện'
      : 'Tìm kiếm Phường hoặc Xã';

  useEffect(() => {
    setItems(data);
    setItemsShow(data);
  }, [data]);

  const handleChange = (e: any) => {
    const { value } = e.target;
    setKeySearch(value);
    const result = items.filter(
      (data: any) =>
        data?.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    setItemsShow(result);
  };

  const chooseItem = (item: string) => {
    switch (type) {
      case 'city':
        dispath(
          chooseItemAddress({
            ...address,
            city: item,
            dist: '',
            ward: '',
            confirmLocation: '',
          })
        );
        break;
      case 'dist':
        dispath(
          chooseItemAddress({
            ...address,
            dist: item,
            ward: '',
            confirmLocation: '',
          })
        );
        break;
      case 'ward':
        dispath(
          chooseItemAddress({
            ...address,
            [type]: item,
            confirmLocation: '',
          })
        );
        handleCloseModal?.();
        break;
      default:
        dispath(
          chooseItemAddress({
            ...address,
            confirmLocation: '',
            [type]: item,
          })
        );
        break;
    }
  };

  const exitSearch = () => {
    // if (areaMouse) return;
    setTimeout(() => {
      setKeySearch('');
      setItemsShow([...items]);
      setFocus(false);
    }, 300);
  };

  return (
    <>
      <div
        className={`${styles['row_between_center']} ${styles['input_search']}`}
      >
        <div
          className={`${styles['row_between_center']} `}
          style={{
            backgroundColor: '#F4F4F4',
            padding: '15px 20px',
            width: '100%',
            borderRadius: 4,
          }}
        >
          <SvgList.SvgSearch />
          <Input
            onFocus={() => setFocus(true)}
            onBlur={exitSearch}
            value={focus ? keySearch : address[type]?.name}
            bordered={false}
            style={{
              color: '#0F172A',
              padding: 0,
              fontSize: 14,
              marginLeft: 10,
            }}
            onChange={handleChange}
            placeholder={focus ? address[type]?.name : placeholder}
          />
        </div>
      </div>
      <div
        className={styles['frame_list']}
        style={{ height: 280, overflowY: 'scroll' }}
      >
        {itemsShow && itemsShow.length > 0 ? (
          itemsShow.map((item: any) => (
            <div
              onClick={() => chooseItem(item)}
              // onMouseEnter={() => setAreaMouse(true)}
              // onMouseLeave={() => setAreaMouse(false)}
              key={item.id}
              className={
                styles[
                  `${
                    address[type]?.id === item?.id
                      ? 'cont_item_active'
                      : 'cont_item'
                  }`
                ]
              }
            >
              <div
                className={
                  styles[
                    `${address[type]?.id === item?.id ? 'item_active' : 'item'}`
                  ]
                }
              >
                {item?.name}
              </div>
              <Dividers />
            </div>
          ))
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <div
              style={{
                fontSize: 16,
                color: '#0F172A',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              Vui lòng thử lại
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
              Chúng tôi không tìm thấy dữ liệu trên, vui lòng thử lại kết quả
              khác.
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ItemFillAddress;
