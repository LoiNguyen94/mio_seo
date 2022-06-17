import { ICategory } from '@nxseo/model';
import { TabMio, TabPartner, TransitionLayout } from '@nxseo/ui-shares';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import {
  useTransition,
  animated,
  AnimatedProps,
  useSpringRef,
  config,
} from '@react-spring/web';
import { useEffect, CSSProperties } from 'react';
interface HomeConsumerProps {
  data?: any;
  position?: number;
  list_category: ICategory[];
}

const pages: ((
  props: AnimatedProps<{ style: CSSProperties; data: any; list_category: any }>
) => React.ReactElement)[] = [
  ({ style, data, list_category }) => (
    <animated.div style={{ ...style }}>
      <TabMio data={data} list_category={list_category} />
    </animated.div>
  ),
  ({ style, data, list_category }) => (
    <animated.div style={{ ...style }}>
      <TabMio data={data} list_category={list_category} />
    </animated.div>
  ),
  ({ style, data, list_category }) => (
    <animated.div style={{ ...style }}>
      {' '}
      <TabMio data={data} list_category={list_category} />
    </animated.div>
  ),
  ({ style, data, list_category }) => (
    <animated.div style={{ ...style }}>
      {' '}
      <TabMio data={data} list_category={list_category} />
    </animated.div>
  ),
  ({ style, data, list_category }) => (
    <animated.div style={{ ...style }}>
      {' '}
      <TabMio data={data} list_category={list_category} />
    </animated.div>
  ),
];

export function HomeConsumer({
  position = 0,
  data,
  list_category,
}: HomeConsumerProps) {
  const transRef = useSpringRef();

  useEffect(() => {
    transRef.start();
  }, [position]);

  const transitions = useTransition(position, {
    ref: transRef,
    keys: null,
    from: { opacity: 0, transform: 'scale(1.05)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, height: 0, transform: 'scale(0.95)' },
    // config: config.molasses,
  });

  return (
    <TransitionLayout
      title="Tất cả sản phẩm"
      description="Mua mọi thứ"
      photo=""
      showTab={true}
    >
      {/* {Tabs.map((item) => position === item.id && <item.page key={item.id} />)}
       */}
      {/* <TabMio data={data} list_category={list_category} /> */}

      {transitions((style, i) => {
        const Page = pages[i];
        return <Page style={style} data={data} list_category={list_category} />;
      })}
    </TransitionLayout>
  );
}

export default dynamic(() => Promise.resolve(HomeConsumer), { ssr: false });
