import { getProductDetail } from '@nxseo/function-shares';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import DetailContainer from './DetailComponent';
import { GetServerSideProps } from 'next';

const DetailProduct = (props) => {
  const { detail } = props;
  return (
    <>
      <Head>
        <title>{detail?.name}</title>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
        <meta property="og:title" content={detail?.name} key="title" />
        <meta property="og:description" content={detail?.log_time} />
        <meta property="og:image" content={detail?.photo} />
      </Head>
      <DetailContainer detail={detail} />
    </>
  );
};
export default DetailProduct;

// export default dynamic(() => Promise.resolve(DetailProduct), { ssr: true });

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
