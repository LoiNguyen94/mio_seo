import { HomeConsumer, withIonicPage, TabBottom, TabMio } from '@nxseo/ui-shares';
import dynamic from 'next/dynamic';
import {
  getListFlashSaleApi,
  getListProduct,
  getProfileApi,
  handleResponse,
  listCategoryApi,
} from '@nxseo/function-shares';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ICategory, IProduct } from '@nxseo/model';
interface HomeIndex {

  
}
export const HomeIndex = (props: HomeIndex) => {
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
  }, []);

  return (
     <TabMio data={state.items} list_category={state.list_category}/>
  );
};

// export default HomeIndex;
export default HomeIndex;
