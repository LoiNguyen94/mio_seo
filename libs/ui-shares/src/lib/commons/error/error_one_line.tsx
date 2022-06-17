import { WarningOutlined } from '@ant-design/icons';

export interface ErrorOneLineProps {
  id?: number;
  content?: string;
  height?: string;
}

export function ErrorOneLine({
  id = 0,
  content,
  height = 'auto',
}: ErrorOneLineProps) {
  return (
    <div style={{ height: height, padding: content ? '9px 16px' : '0px 16px' }}>
      <div style={{ display: content ? 'block' : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <WarningOutlined
            style={{ fontSize: 13, color: '#FF0000', marginRight: 14 }}
          />
          <div style={{ fontSize: 12, color: '#FF0000', fontWeight: 400 }}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorOneLine;
