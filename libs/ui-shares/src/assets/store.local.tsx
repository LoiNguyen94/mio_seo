import { ImageDefault, ImageResponsive } from './config.image';
import { useWindowSize } from '@nxseo/function-shares';
import { ReactNode } from 'react';

import BGDEMO from './local/bgdemo.png';
import CORNERV from './local/cornerv.png';
import CUP from './local/cup.png';
import FREESHIP from './local/freeship.png';
import ONECHANGEONE from './local/onechangeone.png';
import SHIPDAYAFTER from './local/shipdayafter.png';
import BANNER from './local/banner.png';
import VEGETABLE from './local/vegetable.png';
import BEVERAGE from './local/beverage.png';
import MEAT from './local/meat.png';
import MARINATEDMEAT from './local/marinatedmeat.png';
import SEAFOOD from './local/seafood.png';
import BGFlASHSALE from './local/bgflashsale.png';

const BgDemo: React.FC<{ srcCustom?: string }> = (srcCustom) => {
  const { widthFixed } = useWindowSize();
  return <ImageDefault src={BGDEMO} width={widthFixed} height={250} />;
};

const CornerV: React.FC<{ srcCustom?: string }> = (srcCustom) => {
  const { widthFixed } = useWindowSize();
  return <ImageDefault src={CORNERV} width={20} height={20} />;
};

const Cup: React.FC<{ srcCustom?: string }> = (srcCustom) => {
  const { widthFixed } = useWindowSize();
  return <ImageDefault src={CUP} width={18} height={18} />;
};

const Freeship: React.FC<{ srcCustom?: string }> = (srcCustom) => {
  const { widthFixed } = useWindowSize();
  return <ImageDefault src={FREESHIP} width={17} height={21} />;
};

const OneChangeOne: React.FC<{ srcCustom?: string }> = (srcCustom) => {
  const { widthFixed } = useWindowSize();
  return <ImageDefault src={ONECHANGEONE} width={17} height={21} />;
};

const ShipDayAfter: React.FC<{ srcCustom?: string }> = (srcCustom) => {
  const { widthFixed } = useWindowSize();
  return <ImageDefault src={SHIPDAYAFTER} width={21} height={21} />;
};

const Banner: React.FC<{ srcCustom?: string }> = (srcCustom) => {
  const { widthFixed } = useWindowSize();
  return <ImageResponsive src={BANNER} width={widthFixed - 40} height={150} />;
};

const Vegetable: React.FC<{ srcCustom?: string }> = (srcCustom) => {
  const { widthFixed } = useWindowSize();
  return <ImageDefault src={VEGETABLE} width={50} height={50} />;
};

const Beverage: React.FC<{ srcCustom?: string }> = (srcCustom) => {
  const { widthFixed } = useWindowSize();
  return <ImageDefault src={BEVERAGE} width={50} height={50} />;
};

const Meat: React.FC<{ srcCustom?: string }> = (srcCustom) => {
  const { widthFixed } = useWindowSize();
  return <ImageDefault src={MEAT} width={50} height={50} />;
};

const MarinatedMeat: React.FC<{ srcCustom?: string }> = (srcCustom) => {
  const { widthFixed } = useWindowSize();
  return <ImageDefault src={MARINATEDMEAT} width={50} height={50} />;
};

const Seafood: React.FC<{ srcCustom?: string }> = (srcCustom) => {
  const { widthFixed } = useWindowSize();
  return <ImageDefault src={SEAFOOD} width={50} height={50} />;
};

export interface BGFlashSaleProps {
  children?: ReactNode;
}
const BGFlashSale = ({ children }: BGFlashSaleProps) => {
  const { widthFixed, heightCustom } = useWindowSize();
  return (
    <div style={{ position: 'relative', borderRadius: 50 }}>
      <ImageResponsive
        src={BGFlASHSALE}
        width={widthFixed - 26}
        height={heightCustom}
        radius={8}
      />
      {children}
    </div>
  );
};

export const ImageList = {
  BgDemo,
  CornerV,
  Cup,
  Freeship,
  OneChangeOne,
  ShipDayAfter,
  Banner,
  Vegetable,
  Beverage,
  Meat,
  MarinatedMeat,
  Seafood,
  BGFlashSale,
};

export default ImageList;
