import { HomeConsumer, withIonicPage, TabBottom } from '@nxseo/ui-shares';
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
interface HomeIndex {}

function HomeIndex(props: HomeIndex) {
  const {} = props;
  const [category, setCategory] = useState<ICategory[]>([]);
  const [product, setProduct] = useState<IProduct[]>([]);
  const positionTab = useSelector((state) => state['TabPositionSlice']);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getListProduct();
      // const flash_sale_data = await getListFlashSaleApi();
      const size = 4;
      const items = data.slice(0, size);
      const list_category = await listCategoryApi();
      setCategory(list_category);
      setProduct(items);
    } catch (err) {}
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await getProfileApi();
        handleResponse({ res, success: (res) => {}, error: (res) => {} });
      } catch (error) {}
    };
    getProfile();
  }, []);

  return (
    <>
      <HomeConsumer
        data={product}
        position={positionTab}
        list_category={category}
      />
      <TabBottom />
    </>
  );
}

// export async function getStaticProps(context) {
//   // Fetch data from external API
//   const data = await getListProduct();
//   const flash_sale_data = await getListFlashSaleApi();
//   const size = 4;
//   const items = data.slice(0, size);
//   const list_category = await listCategoryApi();
//   // // Pass data to the page via props
//   return {
//     props: { items: items, flash_sale_data: flash_sale_data, list_category },
//   };
// }

// export default HomeIndex;
export default dynamic(() => Promise.resolve(withIonicPage(HomeIndex)), {
  ssr: false,
});
