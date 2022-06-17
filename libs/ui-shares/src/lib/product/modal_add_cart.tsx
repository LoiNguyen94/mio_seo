import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Row, Col } from 'antd';
import styles from './product.module.scss';
import {
  formatMoneyVND,
  setStorage,
  imageLoader,
} from '@nxseo/function-shares';
import {
  Buttons,
  AdjustedQuantity,
  SvgList,
  ImageList,
  ModalCustomBottom,
} from '@nxseo/ui-shares';

export interface ModalAddCartProps {
  // visibleParent: boolean;
  data: any;
  handle(): any;
}

export function ModalAddCart({
  // visibleParent = false,
  data,
  handle,
}: ModalAddCartProps) {
  const fakeData = ['Gói 250', 'Gói 350', 'Gói 450'];
  const [chooseType, setChooseType] = useState(1);
  const [total, setTotal] = useState('0');
  const router = useRouter();

  useEffect(() => {
    setTotal(formatMoneyVND(parseInt(data?.market_price) * 1));
  }, []);

  const getQuantity = (child: number) => {
    setTotal(formatMoneyVND(parseInt(data?.market_price) * child));
  };

  const addCart = () => {
    setStorage('test', 'tooi laf trtrurwmf');
    router.push('/cart');
  };

  return (
    <ModalCustomBottom>
      <div className={styles['p_10_20_10_20']}>
        <div style={{ position: 'absolute' }}>
          <Button
            className={styles['p_0']}
            onClick={() => {
              handle();
            }}
            style={{
              backgroundColor: 'rgba(255,255,255,0)',
              border: 'none',
            }}
          >
            <SvgList.SvgXmark />
          </Button>
        </div>
        {/* <div
          className={styles['title']}
          style={{ color: '#29313F', fontSize: 16 }}
        >
          Thêm vào giỏ hàng
        </div> */}
      </div>
      <Row
        className={styles['m_20_0_0_0']}
        style={{
          fontSize: 14,
        }}
        gutter={[10, 24]}
      >
        <Col
          className={styles['p_0']}
          style={
            {
              // backgroundColor: '#F4F6F8',
            }
          }
          span={24}
        >
          <div
            className={`${styles['p_10_20_10_20']} ${styles['row_center']}`}
            style={{
              alignItems: 'flex-start',
              // backgroundColor: '#F4F6F8',
            }}
          >
            <Image
              loader={imageLoader}
              alt="bg"
              src={data?.photo}
              width={80}
              height={80}
              priority
            />
            <div
              style={{
                marginLeft: 12,
              }}
            >
              <p style={{ color: '#576071', fontWeight: 700, fontSize: 16 }}>
                {data?.name}
              </p>
              <p>
                <span
                  style={{ fontSize: 14, fontWeight: 700, color: '#29313F' }}
                >
                  {formatMoneyVND(data?.market_price)}
                </span>
                <span
                  style={{
                    marginLeft: 19,
                    fontSize: 11,
                    color: '#B6BDCB',
                    textDecoration: 'line-through',
                  }}
                >
                  {formatMoneyVND(data?.market_price)}
                </span>
              </p>
            </div>
          </div>
        </Col>
        <Col className={styles['p_0_20']} span={24}>
          <p
            style={{
              color: '#576071',
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            Chọn loại hàng
          </p>
          <Row gutter={[10, 24]}>
            {fakeData.map((item, index) => (
              <Col key={index} span={6}>
                <div
                  onClick={() => setChooseType(index)}
                  key={index}
                  className={
                    chooseType === index
                      ? styles['item_product_type_active']
                      : styles['item_product_type']
                  }
                >
                  {chooseType === index && (
                    <div style={{ position: 'absolute', top: 0, right: 0 }}>
                      <ImageList.CornerV />
                    </div>
                  )}
                  <div className={styles['p_9_16']}>{item}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
        <Col className={styles['p_0_20']} span={24}>
          <p
            style={{
              color: '#576071',
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            Số lượng
          </p>
          <AdjustedQuantity handleQuantity={getQuantity} />
        </Col>
        <Col className={styles['p_0_20']} span={24}>
          <Row gutter={[10, 24]}>
            <Col span={24}>
              <p style={{ color: '#576071', fontSize: 12 }}>Tạm tính:</p>
              <p style={{ color: '#EC4261', fontSize: 16, fontWeight: 700 }}>
                {total}
              </p>
            </Col>
            <Col span={12}>
              <Buttons
                handleClick={() => addCart()}
                title="Thêm vào giỏ hàng"
                bgColor="#FFFFFF"
                border="2px solid #EC4261"
                titleColor="#000000"
              />
            </Col>
            <Col span={12}>
              <Buttons
                handleClick={() => addCart()}
                title="Mua ngay"
                bgColor="#EC4261"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </ModalCustomBottom>
  );
}

export default ModalAddCart;
