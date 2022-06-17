import styles from './../Cart.module.scss';
import Image from 'next/image';
// import PartnerDefault from './../../../../assets/partnerdefault.png';
import { imageLoader } from '@nxseo/function-shares';

export interface CartMioPartnerProps {
  data?: any;
}

export function CartMioPartner({ data }: CartMioPartnerProps) {
  return (
    <div>
      <div
        style={{
          fontWeight: 700,
          color: '#576071',
          fontSize: 16,
          marginBottom: 12,
        }}
      >
        Bạn được chăm sóc bởi
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* <Image
          loader={imageLoader}
          objectFit="cover"
          alt="bg"
          src={PartnerDefault}
          width={48}
          height={48}
          priority
        /> */}
        <div
          style={{
            marginLeft: 12,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: '#576071',
              fontSize: 14,
            }}
          >
            Mio Partner - 24062020
          </div>
          <div
            style={{
              fontWeight: 400,
              color: '#798395',
              fontSize: 12,
            }}
          >
            Giao hàng miễn phí tại khu dân cư
          </div>
        </div>
      </div>
    </div>
  );
}

// export default dynamic(() => Promise.resolve(CartMioPartner), { ssr: false });

export default CartMioPartner;
