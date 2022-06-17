import { Spin } from 'antd';
import styles from './loading.module.scss';
const Loading = () => (
  <div className={styles['container']}>
    <div className={styles['example']}>
      <Spin size="large" />
    </div>
  </div>
);
export { Loading };
