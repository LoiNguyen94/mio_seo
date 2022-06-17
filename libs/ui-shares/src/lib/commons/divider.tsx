import { Divider } from 'antd';

export interface DividersProps {
  height?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export function Dividers({
  height = '1',
  top = '0',
  bottom = '0',
  left = '0',
  right = '0',
}: DividersProps) {
  return (
    <Divider
      style={{
        borderTop: `${height}px solid rgba(0, 0, 0, 0.06)`,
        margin: `${top}px ${right}px ${bottom}px ${left}px `,
      }}
    />
  );
}

export default Dividers;
