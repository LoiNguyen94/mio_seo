import {
  TransitionLayout,
  Header,
  LocationListScreen,
  withIonicPage,
} from '@nxseo/ui-shares';
import dynamic from 'next/dynamic';

export interface LocationProps {
  id?: number;
}

function LocationScreen(props: LocationProps) {
  return (
    <div>
      <TransitionLayout
        title="Danh sách địa chỉ"
        description="Địa chỉ giao hàng"
        photo=""
      >
        <Header title={'Danh sách địa chỉ'} />
        <LocationListScreen />
      </TransitionLayout>
    </div>
  );
}
export default dynamic(() => Promise.resolve(withIonicPage(LocationScreen)), {
  ssr: false,
});
