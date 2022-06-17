import { Swiper, SwiperSlide } from 'swiper/react';
import { ImageList } from '@nxseo/ui-shares';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';
import 'swiper/css/lazy';

import { Autoplay, Lazy, EffectCube, Pagination } from 'swiper';

export interface BannerProps {
  id?: string;
}

export function Banner({ id }: BannerProps) {
  return (
    <Swiper
      slidesPerView={'auto'}
      effect={'cube'}
      grabCursor={true}
      cubeEffect={{
        shadow: false,
        slideShadows: false,
      }}
      // style={{
      //   '--swiper-pagination-color': '#FCC7D1',
      // }}
      lazy={true}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Autoplay, Lazy, Pagination, EffectCube]}
      spaceBetween={20}
      centeredSlides={true}
      loop={true}
    >
      <SwiperSlide>
        <ImageList.Banner />
      </SwiperSlide>
      <SwiperSlide>
        <ImageList.Banner />
      </SwiperSlide>
      <SwiperSlide>
        <ImageList.Banner />
      </SwiperSlide>
    </Swiper>
  );
}

export default Banner;
