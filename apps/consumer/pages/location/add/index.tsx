import {
  TransitionLayout,
  Header,
  LocationScreen,
  withIonicPage,
} from '@nxseo/ui-shares';
import dynamic from 'next/dynamic';

export interface AddLocationProps {
  id?: number;
}

function AddLocationScreen(props: AddLocationProps) {
  return (
    <div>
      <TransitionLayout
        title="Thêm mới địa chỉ"
        description="Thêm địa chỉ giao hàng"
        photo=""
      >
        <Header title={'Thêm mới địa chỉ'} />
        <LocationScreen />
      </TransitionLayout>
    </div>
  );
}

// export default AddLocationScreen
export default dynamic(
  () => Promise.resolve(withIonicPage(AddLocationScreen)),
  {
    ssr: false,
  }
);
