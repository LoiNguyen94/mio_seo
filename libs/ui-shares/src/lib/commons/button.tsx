import { Button } from 'antd';
export interface ButtonsProps {
  title: string;
  bgColor?: string;
  titleColor?: string;
  width?: string;
  borderRadius?: string;
  border?: string;
  filter?: string;
  margin?: string;
  handleClick(): any;
}

export function Buttons({
  title,
  bgColor,
  width = '100%',
  borderRadius = '8px',
  titleColor = '#ffffff',
  border = 'none',
  margin = '0px 0px 0px 0px',
  filter = 'drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.16))',
  handleClick,
}: ButtonsProps) {
  return (
    <Button
      onClick={handleClick}
      style={{
        backgroundColor: bgColor,
        border: border,
        borderRadius: borderRadius,
        width: width,
        boxShadow: 'none',
        fontSize: 16,
        fontWeight: 500,
        color: titleColor,
        height: '48px',
        padding: 0,
        filter: filter,
        margin: margin,
      }}
    >
      {title}
    </Button>
  );
}

export default Buttons;
