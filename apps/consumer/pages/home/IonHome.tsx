import {
  HomeConsumer,
  withIonicPage,
  TabBottom,
  TabMio,
  Buttons,
} from '@nxseo/ui-shares';
import dynamic from 'next/dynamic';
import {
  getListFlashSaleApi,
  getListProduct,
  getProfileApi,
  handleResponse,
  listCategoryApi,
  SCREEN,
  useAppSelector,
  useNavigation,
} from '@nxseo/function-shares';
import { useEffect, useState, memo } from 'react';
import { ICategory, IProduct } from '@nxseo/model';
interface HomeIndex {}
export const IonHome = memo((props: HomeIndex) => {
  const { push } = useNavigation();
  const token = useAppSelector((state) => state.auth.token);
  const isAuth = token !== undefined;
  const [state, setState] = useState({
    list_category: [],
    items: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await getProfileApi();
        const products = await getListProduct();
        const list_category = await listCategoryApi();
        setState({
          items: products,
          list_category: list_category,
        });
        // handleResponse({ res, success: (res) => {}, error: (res) => {} });
      } catch (error) {}
    };
    fetchData();
    return () => {};
  }, []);
  const goToLogin = () => {
    push(SCREEN.login);
  };
  return (
    <>
      <TabMio data={state.items} list_category={state.list_category} />
      {!isAuth ? (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Buttons
            title="Đăng nhập ngay"
            handleClick={goToLogin}
            bgColor={'#EC4261'}
            titleColor={'#FFFFFF'}
          />
        </div>
      ) : null}
    </>
  );
});

export default dynamic(() => Promise.resolve(withIonicPage(IonHome)), {
  ssr: false,
});
