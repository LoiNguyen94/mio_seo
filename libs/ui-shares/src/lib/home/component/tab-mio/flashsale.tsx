import styles from './flashsale.module.scss';
import { ImageList, SvgList, Star, CountDown } from '@nxseo/ui-shares';
import {
  imageLoader,
  formatMoneyVND,
  getPriceInList,
  useNavigation,
  SCREEN,
} from '@nxseo/function-shares';
import Image from 'next/image';
import Link from 'next/link';
import { Row, Col, Card } from 'antd';
export interface FlashSaleProps {
  id?: string;
  data?: any;
}

const { Meta } = Card;

export function FlashSale({ id, data }: FlashSaleProps) {
  const { pushScreenParam,pushRaw } = useNavigation();
  return (
    <div
      className={`${styles['p_10_13_10_13']} flash_sale_page`}
      style={{
        marginTop: 12,
      }}
    >
      <ImageList.BGFlashSale>
        <div
          className={`${styles['p_8_8_8_8']}`}
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{ marginBottom: 14 }}
            className={`${styles['row_between_center']} ${styles['p_8_8_8_8']}`}
          >
            <div className={`${styles['row_center']}`}>
              <div style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700 }}>
                Flash Sale
              </div>
              <div style={{ marginLeft: 12 }}>
                <CountDown />
              </div>
            </div>
            <div
              style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Xem tất cả
            </div>
          </div>
          <Row
            style={{ marginLeft: 0, marginRight: 0, marginBottom: 16 }}
            gutter={[16, 16]}
          >
            {data &&
              data.map(
                (item: any, index: number) =>
                  item.photo &&
                  index < 30 && (
                    <Col style={{}} key={item.id} span={12}>
                      <div
                        onClick={() =>
                          pushScreenParam(SCREEN.detail_product, item?.id)
                        }
                      >
                        <a style={{ width: '100%' }}>
                          <Card
                            className={styles['p_0']}
                            hoverable
                            style={{
                              width: '100%',
                              height: 'auto',
                            }}
                            cover={
                              <Image
                                loader={imageLoader}
                                alt="example"
                                src={item?.photo}
                                layout="responsive"
                                width={'213px'}
                                height={'162px'}
                                priority
                              />
                            }
                          >
                            <div
                              style={{ height: 98 }}
                              className={styles['column_between_center']}
                            >
                              <div
                                style={{
                                  fontSize: 12,
                                  color: '#576071',
                                  fontWeight: 400,
                                }}
                              >
                                {item?.name}
                              </div>
                              <Star countStar={3} />
                              <div>
                                <div
                                  style={{
                                    fontSize: 14,
                                    color: '#29313F',
                                    fontWeight: 700,
                                  }}
                                >
                                  {formatMoneyVND(
                                    getPriceInList(item?.price_list)
                                  )}
                                </div>
                                <div
                                  style={{
                                    fontSize: 11,
                                    color: '#B6BDCB',
                                    fontWeight: 400,
                                    textDecoration: 'line-through',
                                    // marginLeft: 6,
                                  }}
                                >
                                  {formatMoneyVND(item?.market_price)}
                                </div>
                              </div>
                            </div>
                          </Card>
                        </a>
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 120,
                          right: 12,
                          cursor: 'pointer',
                        }}
                      >
                        <SvgList.SvgPlusCart />
                      </div>
                    </Col>
                  )
              )}
          </Row>
          {/* <Buttons
            handleClick={() => console.log(true)}
            title="Xem tất cả khuyến mãi"
            bgColor="#FFFFFF"
            titleColor="#F0224F"
            borderRadius="4px"
          /> */}
        </div>
      </ImageList.BGFlashSale>
    </div>
  );
}

export default FlashSale;
