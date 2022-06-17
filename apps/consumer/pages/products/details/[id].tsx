import { getProductDetail } from '@nxseo/function-shares';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Detail from './IonDetail';
import { GetServerSideProps } from 'next';

const DetailProduct = () => {
  return (
    <>
      <Head>
        <title>{'data?.name'}</title>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
        <meta property="og:title" content={'data?.name'} key="title" />
        <meta property="og:description" content={'data?.log_time'} />
        <meta property="og:image" content={'data?.photo'} />
      </Head>
      <Detail />
    </>
  );
};
export default dynamic(() => Promise.resolve(Detail), { ssr: true });

// export const getStaticPaths = async () => {
//   // const res = await fetch(`https://dev-api.itaphoa.com/customer/products`);
//   // const data = await res.json();

//   const data = await getListProduct();
//   const paths = data.map((item) => ({
//     params: { id: item.id.toString() },
//   }));

//   return { paths, fallback: true };
// };

// export const getStaticProps = async ({ params }) => {
//   try {
//     const id = params?.id;
//     // const res = await fetch(
//     //   `https://dev-api.itaphoa.com/customer/products/${id}`
//     // );
//     const detail = await getProductDetail(id);
//     return { props: { detail } };
//   } catch (err: any) {
//     return { props: { errors: err.message } };
//   }
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const id = context?.params?.id;
    // const res = await fetch(
    //   `https://dev-api.itaphoa.com/customer/products/${id}`
    // );
    const detail = await getProductDetail(id.toString());
    return { props: { detail } };
  } catch (err: any) {
    return { props: { errors: err.message } };
  }
};
