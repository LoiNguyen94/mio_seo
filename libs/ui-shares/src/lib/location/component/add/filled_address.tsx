import styles from './../../add/add.module.scss';
import { PageMap, ErrorOneLine } from '@nxseo/ui-shares';
import {
  ChooseItemAddessState,
  SCREEN,
  useNavigation,
} from '@nxseo/function-shares';
import { useSelector } from 'react-redux';

export interface FilledAddressProps {
  id?: number;
  data?: ChooseItemAddessState;
}

export function FilledAddress(props: FilledAddressProps) {
  const { data } = props;
  const { push } = useNavigation();
  // const address = useSelector((state: any) => state['ItemAddress']);
  if (!data) return <></>;
  return data['city'] && data['ward'] && data['dist'] && data['other'] ? (
    <>
      <div className={`${styles['title_item']}`}>
        <div
          onClick={() => push(SCREEN.fill_address)}
          style={{ marginBottom: 8, color: '#0F172A' }}
        >
          {data['other'] +
            ', ' +
            data['ward']?.name +
            ', ' +
            data['dist']?.name +
            ', ' +
            data['city']?.name}
        </div>
        {data['lat'] && data['lng'] ? (
          <PageMap
            defaultMarker={{
              latitude: parseFloat(data['lat']),
              longitude: parseFloat(data['lng']),
            }}
            height="120px"
          />
        ) : null}
      </div>
      <ErrorOneLine
        content={data['confirmLocation'] ? '' : 'Địa chỉ chưa được xác nhận'}
      />
    </>
  ) : (
    <div
      onClick={() => push(SCREEN.fill_address)}
      className={`${styles['title_item']}`}
    >
      Nhập địa chỉ của bạn
    </div>
  );
}
export default FilledAddress;
