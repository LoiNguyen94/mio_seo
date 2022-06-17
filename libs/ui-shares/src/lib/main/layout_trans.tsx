import { useState, ReactNode, useEffect, memo } from 'react';
import styles from './layout.module.scss';
// import Head from 'next/head';
import { useWindowSize } from '@nxseo/function-shares';
import { useRouter } from 'next/router';
export interface LayoutTransProps {
  children?: ReactNode;
  title?: string;
  description?: string;
  photo?: string;
  showTab?: boolean;
}

export const TransitionLayout = memo(
  ({
    children,
    title = 'Mio',
    description,
    photo,
    showTab = false,
  }: LayoutTransProps) => {
    const router = useRouter();
    const path = router.pathname;

    const [displayChildren, setDisplayChildren] = useState(children);
    const [routeChildren, setRouteChildren] = useState(path);
    const [transitionStage, setTransitionStage] = useState('fadeOut');
    const { height, widthFixed } = useWindowSize();

    useEffect(() => {
      setTransitionStage('fadeIn');
    }, []);

    useEffect(() => {
      if (children !== displayChildren && path !== routeChildren) {
        setTransitionStage('fadeOut');
        setRouteChildren(path);
      } else {
        setDisplayChildren(children);
      }
    }, [
      children,
      path,
      setDisplayChildren,
      displayChildren,
      setRouteChildren,
      routeChildren,
    ]);

    return (
      <div>
        <div style={{ height: height }} className={styles['container']}>
          <div
            style={{ width: widthFixed }}
            onTransitionEnd={() => {
              if (transitionStage === 'fadeOut') {
                setDisplayChildren(children);
                setTransitionStage('fadeIn');
              }
            }}
            className={`${styles['frame']} ${styles['content']} ${styles['fadeIn']}`}
          >
            {displayChildren}
          </div>
        </div>
      </div>
    );
  }
);
