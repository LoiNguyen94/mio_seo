import {
  getListAddressDeliveryApi,
  addListAddress,
  store,
  handleResponse,
} from '@nxseo/function-shares';

export const fetchListAddressConfig = async () => {
  const res = await getListAddressDeliveryApi();
  handleResponse({
    res,
    success: (res) => {
      const data = res?.data?.data;
      store.dispatch(addListAddress(data?.list));
      return data?.list;
    },
    error: () => {
      return [];
    },
  });
  return [];
};
