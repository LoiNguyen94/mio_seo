import { useState } from 'react';
import { Button } from 'antd';
import styles from './common.module.scss';
import { SvgList } from '@nxseo/ui-shares';
export interface AdjustedQuantityProps {
  id?: number;
  handleQuantity?: any;
}

export function AdjustedQuantity({
  id,
  handleQuantity,
}: AdjustedQuantityProps) {
  const [quantity, setQuantity] = useState(1);

  const handleCount = (prefix: number) => {
    switch (prefix) {
      case 1:
        if (quantity < 2) return;
        setQuantity(quantity - 1);
        handleQuantity(quantity - 1);
        break;
      case 2:
        setQuantity(quantity + 1);
        handleQuantity(quantity + 1);

        break;
    }
  };

  return (
    <div className={styles['row_center']}>
      <Button
        onClick={() => handleCount(1)}
        className={styles['button_custom_quantity']}
      >
        <SvgList.SvgMinus />
      </Button>
      <div className={styles['quantity_picker']}>{quantity}</div>
      <Button
        onClick={() => handleCount(2)}
        className={styles['button_custom_quantity']}
      >
        <SvgList.SvgPlus />
      </Button>
    </div>
  );
}

export default AdjustedQuantity;
