import { ICategory } from '@nxseo/model';
import { TransitionLayout, Header, Buttons } from '@nxseo/ui-shares';
import { isWeb, SCREEN, useNavigation } from '@nxseo/function-shares';
import Banner from './banner';
import Category from './category';
import FlashSale from './flashsale';
import { ReactNode, memo } from 'react';
export interface TabMioProps {
  id?: string;
  data?: any;
  list_category: ICategory[];
}
const Layout = ({ children }: { children: ReactNode }) =>
isWeb ? <>{children}</> : <TransitionLayout>{children}</TransitionLayout>;
export function TabMio({ data, list_category }: TabMioProps) {
  const { push } = useNavigation();
  return (
    <Layout>
      <Header title="" type="TabMio" />
      <div
        style={{
          // backgroundColor: '#E5E5E5',
          paddingTop: 21,
          paddingBottom: 120,
        }}
      >
        <Banner />
        <Category data={list_category} />
        <FlashSale data={data} />
      </div>
    </Layout>
  );
}

export default TabMio;
