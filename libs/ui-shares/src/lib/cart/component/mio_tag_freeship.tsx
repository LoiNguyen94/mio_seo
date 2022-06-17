import styles from './../Cart.module.scss';
import { formatMoneyVND } from '@nxseo/function-shares';
import { SvgList } from '@nxseo/ui-shares';
import { Slider } from 'antd';
import ModalMoreInfoFreeship from './modal_more_info_freeship';
import { useState } from 'react';

export interface CartMioTagFreeshipProps {
  data?: any;
}

export function CartMioTagFreeship({ data }: CartMioTagFreeshipProps) {
  const [visibleModalMoreInfoFreeship, setVisibleModalMoreInfoFreeship] =
    useState(false);
  return (
    <>
      <div
        style={{ marginBottom: 18, fontWeight: 400, fontSize: 14 }}
        className={` ${styles['row_center']} `}
      >
        <div style={{ color: '#F0224F', fontSize: 14, fontWeight: 600 }}>
          Bạn còn thiếu {formatMoneyVND(22000)}
        </div>
        <div
          style={{
            color: '#798395',
            marginLeft: 5,
            marginRight: 10,
          }}
        >
          sẽ được giao miễn phí
        </div>
        <div onClick={() => setVisibleModalMoreInfoFreeship(true)}>
          <SvgList.SvgMoreInfo />
        </div>
      </div>
      <Slider
        handleStyle={{
          backgroundColor: 'white',
          border: 'none',
          height: 18,
          width: 18,
        }}
        min={0}
        max={22000}
        trackStyle={{ backgroundColor: '#00A57B', height: 6 }}
        value={12000}
        //   disabled={true}
      />
      <div
        style={{ fontWeight: 400, fontSize: 14 }}
        className={` ${styles['row_center']} `}
      >
        <div
          style={{
            color: '#798395',
            marginLeft: 5,
            marginRight: 5,
          }}
        >
          Đã mua
        </div>
        <div style={{ color: '#576071', fontSize: 14, fontWeight: 700 }}>
          {formatMoneyVND(12000)}
        </div>
        <div
          style={{
            color: '#798395',
            marginRight: 10,
          }}
        >
          /{formatMoneyVND(22000)}
        </div>
        {visibleModalMoreInfoFreeship && (
          <ModalMoreInfoFreeship
            onClose={() => setVisibleModalMoreInfoFreeship(false)}
          />
        )}
      </div>
    </>
  );
}

export default CartMioTagFreeship;

// export default Cart;
