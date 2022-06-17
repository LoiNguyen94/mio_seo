import { Tabs, Row, Col } from 'antd';
import { useState } from 'react';
import styles from './Cart.module.scss';
import dynamic from 'next/dynamic';
import { useWindowSize } from '@nxseo/function-shares';

import Mio from './mio';
import Partner from './partner';

const { TabPane } = Tabs;

export interface CartProps {
  data?: any;
  errors?: any;
}

export function Cart({ errors, data }: CartProps) {
  const [tab, setTab] = useState('1');
  const { widthFixed } = useWindowSize();
  function callback(key: string) {
    console.log(key);
  }
  if (errors) {
    return <span style={{ color: 'red' }}>ERR: {errors}</span>;
  }

  const renTabBar = (props: any, DefaultTabBar: any) => {
    // console.log(props.panes);
    return (
      <div style={{ width: widthFixed }} className={styles['con_tabbar']}>
        <Row style={{ zIndex: 10000 }} className={styles['row_tabbar']}>
          {props.panes.map((item: any, index: number) => (
            <Col key={index} span={12}>
              <div
                onClick={() => setTab(item?.key)}
                className={
                  tab !== item.key
                    ? styles['con_item_tabbar']
                    : styles['con_item_tabbar_active']
                }
              >
                {item?.props?.tab}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  };
  console.log(tab);

  return (
    <div style={{ marginTop: 75 }}>
      <Tabs renderTabBar={renTabBar} activeKey={tab} onChange={callback}>
        <TabPane tab={`Giỏ hàng Mio(${0})`} key="1">
          <Mio data={[]} />
        </TabPane>
        <TabPane tab={`Giỏ hàng Partner(${0})`} key="2">
          <Partner data={[]} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });

// export default Cart;
