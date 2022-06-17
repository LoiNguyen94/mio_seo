import Image, { StaticImageData } from 'next/image';
import LayoutValue from 'next/image';
import { imageLoader } from '@nxseo/function-shares';
// import { Skeleton } from 'antd';

export interface ImageDefaultProps {
  src: StaticImageData;
  width?: number;
  height?: number;
  radius?: number;
  layout?: typeof LayoutValue;
}

export function ImageDefault({
  src,
  width = 50,
  height = 50,
  radius = 0,
}: 
ImageDefaultProps) {
  return (
    <>
      <Image
        loader={imageLoader}
        // layout={"responsive"}
        alt="img"
        src={src}
        width={width}
        height={height}
        style={{ borderRadius: radius }}
        priority
      />
      {/* {<Skeleton.Button active />} */}
    </>
  );
}

export function ImageResponsive({
  src,
  width = 50,
  height = 50,
  radius = 0,
}: 
ImageDefaultProps) {
  return (
    <>
      <Image
        loader={imageLoader}
        layout={"responsive"}
        alt="img"
        src={src}
        width={width}
        height={height}
        style={{ borderRadius: radius }}
        priority
      />
      {/* {<Skeleton.Button active />} */}
    </>
  );
}

export default ImageDefault;
