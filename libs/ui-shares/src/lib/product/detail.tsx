import { useState } from 'react';
import { Card, Row, Col, Button } from 'antd';
import Image from 'next/image';
import styles from './product.module.scss';

// import FreeShip from './../../../assets/freeship.png';
// import OneChangeOne from './../../../assets/onechangeone.png';
// import ShipDayAfter from './../../../assets/shipdayafter.png';
// import Cup from './../../../assets/cup.png';

import {
  formatMoneyVND,
  useWindowSize,
  imageLoader,
} from '@nxseo/function-shares';
import {
  Dividers,
  ModalDetailInfo,
  Buttons,
  ModalAddCart,
  AdjustedQuantity,
  SvgList,
  ImageList,
  Star,
} from '@nxseo/ui-shares';

export interface DetailProps {
  detail: any;
}

export function Detail(props: DetailProps) {
  const {detail } = props;
  const fakeData = ['Bao ăn', '1 đổi 1'];
  // const [countStar, setCountStar] = useState(1);
  const [visibleModalProductInfo, setVisibleModalProductInfo] = useState(false);
  const [visibleModalAddCart, setVisibleModalAddCart] = useState(false);
  const { widthFixed } = useWindowSize();

  const priceList = Object.keys(detail?.price_list).map(
    (key) => detail?.price_list[key]
  );
  const priceMio = priceList[0]?.price;

  if (!detail) {
    return null
  }

  return (
    <div style={{ marginTop: 85, paddingBottom: 85 }}>
      <Image
        loader={imageLoader}
        alt="bg"
        src={detail?.photo}
        width={widthFixed}
        height={400}
        priority
      />
      <div
        className="detail_page"
        style={{ padding: '0px 20px', marginTop: -40 }}
      >
        {/* <div style={{ backgroundColor: 'red', padding: 15 }}>dsadsa</div> */}
        <Card className={styles['card_custom']}>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <div className={styles['name_product']}>
                {detail?.name} - {detail?.unit}
              </div>
            </Col>
            <Col span={24}>
              <div className={styles['row_between_center']}>
                {' '}
                <p>
                  <span
                    style={{ fontSize: 18, fontWeight: 700, color: '#EC4261' }}
                  >
                    {formatMoneyVND(priceMio)}
                  </span>
                  <span
                    style={{
                      marginLeft: 19,
                      fontSize: 14,
                      color: '#B6BDCB',
                      textDecoration: 'line-through',
                    }}
                  >
                    {formatMoneyVND(detail?.market_price)}
                  </span>
                </p>
                <AdjustedQuantity
                  handleQuantity={(child: number) => {
                    console.log(child);
                  }}
                />
              </div>
            </Col>
            <Col className={styles['row_between_center']} span={24}>
              <Star countStar={3} />
              <div>Đã bán 50</div>
            </Col>

            <Col className={styles['row_between_center']} span={24}>
              <div className={styles['row_center']}>
                <div style={{ width: 25, height: 21 }}>
                  <ImageList.Freeship />
                </div>
                <span style={{ fontSize: 12 }}>
                  Freeship đơn
                  <br /> hàng 210k
                </span>
              </div>
              <div className={styles['row_center']}>
                <div style={{ width: 25, height: 21 }}>
                  <ImageList.ShipDayAfter />
                </div>
                <span style={{ fontSize: 12 }}>
                  Giao hàng vào
                  <br /> ngày hôm sau
                </span>
              </div>
              <div className={styles['row_center']}>
                <div style={{ width: 25, height: 21 }}>
                  <ImageList.OneChangeOne />
                </div>
                <span style={{ fontSize: 12 }}>
                  Bao ăn
                  <br /> 1 đổi 1
                </span>
              </div>
            </Col>

            <Col className={styles['row_center']} span={24}>
              <div style={{ width: 25, height: 21 }}>
                <ImageList.Cup />
              </div>
              <div style={{ fontSize: 12 }}>
                <span style={{ color: '#EC4261' }}>Top 3</span> sản phẩm bán
                chạy trong Thịt mát
              </div>
            </Col>
          </Row>
        </Card>
        <p
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#576071',
            margin: '20px 0px 10px 0px',
          }}
        >
          Thông tin sản phẩm
        </p>
        <Row style={{ fontSize: 14 }} gutter={[10, 10]}>
          <Col span={13}>Giá trị trường</Col>
          <Col span={11}>{formatMoneyVND(detail?.market_price)}</Col>

          <Col span={13}>Giá Mio cung cấp</Col>
          <Col style={{ color: '#EC4261' }} span={11}>
            {formatMoneyVND(priceMio)}
          </Col>

          <Col span={13}>Danh mục</Col>
          <Col className={styles['row_between_center']} span={11}>
            {detail?.category}{' '}
            <SvgList.SvgRightArrow width="6" height="11" color="#677187" />
          </Col>

          <Col span={13}>Đơn vị</Col>
          <Col span={11}>{detail?.unit}</Col>

          <Col span={13}>Xuất sứ</Col>
          <Col span={11}>{detail?.origin}</Col>
        </Row>
      </div>
      <Dividers height="8" top="20" bottom="20" />
      <div style={{ padding: '0px 20px' }}>
        <p
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#576071',
            marginBottom: '15px',
          }}
        >
          Mô tả sản phẩm
        </p>
        <Row style={{ fontSize: 14 }} gutter={[10, 10]}>
          {fakeData.map((item, index) => (
            <Col key={index} className={styles['row_center']} span={8}>
              <SvgList.SvgTickVCustom />
              <div style={{ fontSize: 14, color: '#00A57B', marginLeft: 5 }}>
                {item}
              </div>
            </Col>
          ))}
        </Row>
        <div className={styles['text_description']} style={{ marginTop: 15 }}>
          {detail?.info?.description}
        </div>
      </div>
      <Dividers top="20" />
      <div style={{ paddingBottom: 20 }}>
        <Button
          onClick={() => {
            setVisibleModalProductInfo(true);
          }}
          type="link"
          className={`${styles['row_center']} ${styles['button_custom']}`}
        >
          <span style={{ color: '#EC4261', fontSize: 14, marginRight: 5 }}>
            Xem thêm
          </span>
          <SvgList.SvgDownArrow />
        </Button>
      </div>
      <div style={{ backgroundColor: '#F6F6F6', padding: '24px 20px' }}>
        <p
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#576071',
            marginBottom: '15px',
          }}
        >
          Sản phẩm tương tự
        </p>
      </div>

      <div
        style={{
          padding: 20,
          position: 'fixed',
          bottom: 0,
          width: widthFixed,
          backgroundColor: 'white',
        }}
      >
        <Buttons
          handleClick={() => setVisibleModalAddCart(true)}
          title="Thêm vào giỏ hàng"
          bgColor="#EC4261"
        />
      </div>

      {visibleModalProductInfo && (
        <ModalDetailInfo
          // visibleParent={visibleModalProductInfo}
          content={detail?.info?.description}
          handle={() => setVisibleModalProductInfo(false)}
        />
      )}
      {visibleModalAddCart && (
        <ModalAddCart
          data={detail}
          // visibleParent={visibleModalAddCart}
          handle={() => setVisibleModalAddCart(false)}
        />
      )}
    </div>
  );
}

export default Detail;
