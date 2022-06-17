import { Detail, withIonicPage } from '@nxseo/ui-shares';
import { TransitionLayout, Header } from '@nxseo/ui-shares';
import {
  getProductDetail,
  getListProduct,
  isWeb,
} from '@nxseo/function-shares';
import dynamic from 'next/dynamic';
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
    } catch (err) {}
  };

  if (!data) return null;
  return <DetailComponent detail={data} />;
};

export default withIonicPage(DetailContainer);
