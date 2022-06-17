import styles from './layout.module.scss';

/* eslint-disable-next-line */
import React, { ReactNode } from 'react';
import TabBottom from './tab_bottom';
import { useWindowSize } from '@nxseo/function-shares';
import Head from 'next/head';

export interface LayoutProps {
  children?: ReactNode;
  title?: string;
  description?: string;
  photo?: string;
  showTab?: boolean;
}

export function MainLayout({
  children,
  title = 'Mio',
  description,
  photo,
  showTab = false,
}: LayoutProps) {
  const { height, widthFixed } = useWindowSize();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, user-scalable=no"
        />
        <meta property="og:title" content={title} key="title" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={photo} />
      </Head>
      <div style={{ height: height }} className={styles['container']}>
        <div style={{ width: widthFixed }} className={styles['frame']}>
          {children}
        </div>
        {showTab && <TabBottom width={widthFixed} />}
      </div>
    </>
  );
}

export default MainLayout;
