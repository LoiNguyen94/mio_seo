import { TransitionLayout, Header } from '@nxseo/ui-shares';
import {
  getListProduct,
  imageLoader,
  SCREEN,
  useNavigation,
} from '@nxseo/function-shares';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Row, Col, Card } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const { Meta } = Card;

export interface ProductProps {
  id: number;
}

function Products(props: ProductProps) {
  const [data, setData] = useState([]);
  const {} = props;
  const { pushScreenParam } = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getListProduct();
      setData(data);
    } catch (err) {}
  };

  return (
    <div>
      <TransitionLayout
        title="Tất cả sản phẩm"
        description="Mua mọi thứ"
        photo=""
      >
        <>
          <Header title={'Sản phẩm'} />
          <div style={{ marginTop: 85, paddingBottom: 15 }}>
            <Row style={{ marginLeft: 0, marginRight: 0 }} gutter={[16, 16]}>
              {data &&
                data.map(
                  (item: any, index: number) =>
                    item.photo &&
                    index < 30 && (
                      <Col
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                        key={item.id}
                        span={12}
                      >
                        <div
                          onClick={() => {
                            console.log('navigate');
                            // pushScreenParam(SCREEN.detail_product, item?.id)
                          }}
                        >
                          <a>
                            <Card
                              hoverable
                              style={{ width: 172 }}
                              cover={
                                <Image
                                  loader={imageLoader}
                                  alt="example"
                                  src={item?.photo}
                                  width={240}
                                  height={230}
                                  priority
                                />
                              }
                              actions={[
                                <div key="price">{item?.market_price}</div>,
                                <ShoppingCartOutlined key="cart" />,
                              ]}
                            >
                              <Meta
                                title={item?.name}
                                description={item?.category}
                              />
                            </Card>
                          </a>
                        </div>
                      </Col>
                    )
                )}
            </Row>
          </div>
        </>
      </TransitionLayout>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Products), { ssr: false });
