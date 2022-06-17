
import { Swiper, SwiperSlide } from 'swiper/react';
import { imageLoader, useWindowSize } from '@nxseo/function-shares';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/free-mode';

import { FreeMode } from 'swiper';
import { ICategory } from '@nxseo/model';

export interface CategoryProps {
  data: ICategory[];
}

export function Category(props: CategoryProps) {
  const { data = [] } = props;
  const { widthFixed } = useWindowSize();
  return (
    <div
      style={{
        paddingLeft: 13,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      <div
        style={{
          color: '#0F172A',
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 6,
        }}
      >
        Danh mục sản phẩm
      </div>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={25}
        freeMode={true}
        modules={[FreeMode]}
        className="catagorySwiper"
        setWrapperSize={true}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <Image
              loader={imageLoader}
              objectFit="cover"
              alt="bg"
              src={item.photo}
              width={48}
              height={48}
              priority
            />
            <div
              style={{
                color: '#576071',
                fontSize: 10,
                textAlign: 'center',
                width: 50,
              }}
            >
              {item.display_name}
            </div>
          </SwiperSlide>
          // <div style={{ marginRight: 24, cursor: 'pointer' }} key={item.id}>
          //   {item.img}
          //   <div
          //     style={{
          //       color: '#576071',
          //       fontSize: 10,
          //       textAlign: 'center',
          //       width: 50,
          //     }}
          //   >
          //     {item.title}
          //   </div>
          // </div>
        ))}
      </Swiper>
    </div>
  );
}

export default Category;
