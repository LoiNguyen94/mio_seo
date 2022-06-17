import { withIonicPage } from '@nxseo/ui-shares';
import { getProductDetail } from '@nxseo/function-shares';
import { useEffect, useState } from 'react';
import DetailComponent from './DetailComponent';
interface DetailProps {
  match?: { params: { id: any } };
  detail: undefined;
}
export  const DetailContainer = (props: DetailProps) => {
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
      <DetailComponent detail={data} />
    </>
  );
};

export default withIonicPage(DetailContainer);
