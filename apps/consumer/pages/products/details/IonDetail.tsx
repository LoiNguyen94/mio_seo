import { withIonicPage } from '@nxseo/ui-shares';
import { getProductDetail } from '@nxseo/function-shares';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import DetailComponent from './DetailComponent';
interface DetailProps {
  match?: { params: { id: any } };
  detail: undefined;
}
const DetailContainer = (props: DetailProps) => {
  const [data, setData] = useState(props.detail);
  useEffect(() => {
    if (!data) {
      fetchDetail();
    }
  }, []);
  const fetchDetail = async () => {
    try {
      const id = props?.match?.params?.id;
      const detail = await getProductDetail(id);
      setData(detail);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) return null;
  return (
    <>
      <Head>
        <title>{data?.name}</title>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
        <meta property="og:title" content={data?.name} key="title" />
        <meta property="og:description" content={data?.log_time} />
        <meta property="og:image" content={data?.photo} />
      </Head>
      <DetailComponent detail={data} />
    </>
  );
};

export default withIonicPage(DetailContainer);
