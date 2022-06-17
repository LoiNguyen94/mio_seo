import { SvgList } from '@nxseo/ui-shares';

export interface StarProps {
  countStar?: number;
}

export function Star({ countStar = 0 }: StarProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* <Rate
                  allowHalf
                  allowClear={false}
                  defaultValue={countStar}
                /> */}
      <span style={{ fontSize: 14, color: '#F4C82B', marginRight: 5 }}>
        {countStar}/5
      </span>
      <SvgList.SvgStar />
    </div>
  );
}

export default Star;
