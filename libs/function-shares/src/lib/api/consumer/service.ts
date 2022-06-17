import {
  IListDistrict,
  IListProvince,
  IUserInfo,
  IListWard,
  IListAddress,
  ICategory,
  IProfile,
} from '@nxseo/model';
import { AxiosResponse } from 'axios';
import { call } from '../APIManager';
import { APIEndPoint, SignUpParam, ForgotParam, AddressParam } from '../type';
export const apiServer = process.env.NX_DOMAIN;
interface IResponse<T> {
  status: { code: number; message: string };
  data?: T;
}
type ResponseType<T> = Promise<AxiosResponse<IResponse<T>>>;
export const getListProduct = async () => {
  try {
    const res = await call(APIEndPoint.list_product);
    const data = await res.data.data.list;
    return data;
  } catch (error) {
    return [];
  }
};

export const getProductDetail = async (id: string) => {
  const res = await call(APIEndPoint.detail_product, id);
  const data = await res.data.data;
  return data;
};

export const loginApi = async (
  phone: string,
  password: string
): ResponseType<IUserInfo> => {
  return call(APIEndPoint.login, { phone, password });
};

export const phoneExistApi = async (
  phone: string
): ResponseType<{ isExist: boolean }> => {
  return call(APIEndPoint.phone_no_exist, { phone });
};

export const sendOtpApi = async (phone: string) => {
  return new Promise((reslove, reject) => {
    call(APIEndPoint.send_otp, { phone })
      .then((res) => {
        if (res.data.status.code === 200) {
          return reslove('');
        }
        return reject({ response: res.data });
      })
      .catch(() => reslove(''));
  });
};

export const signupApi = async ({
  platform,
  address,
  fullName,
  otpCode,
  phone,
  referer_id,
  password,
}: SignUpParam): ResponseType<{
  message: string;
  token: string;
}> => {
  return call(APIEndPoint.signup_with_otp, {
    platform,
    address,
    fullName,
    otpCode,
    phone,
    referer_id,
    password,
  });
};

export const genRefererIdApi = (code: string) => {
  return call(APIEndPoint.gen_referer_id, { code });
};

export const forgotPasswordApi = (
  data: ForgotParam
): ResponseType<{ message?: string }> => {
  return call(APIEndPoint.forgot_password, data);
};

export const getListSessionDeliveryApi = () => {
  return call(APIEndPoint.list_session_delivery);
};

export const getListAddressDeliveryApi = (): ResponseType<IListAddress> => {
  return call(APIEndPoint.list_address_delivery);
};

export const createAddressDeliveryApi = async ({
  location_id,
  note,
  is_default,
  delivery_name,
  delivery_phone,
  delivery_time_end,
  delivery_time_start,
  delivery_address_json,
  session_delivery_json,
  address_type_json,
  lat,
  lng,
}: AddressParam): ResponseType<{
  message: string;
}> => {
  return call(APIEndPoint.create_address_delivery, {
    location_id,
    note,
    is_default,
    delivery_name,
    delivery_phone,
    delivery_time_end,
    delivery_time_start,
    delivery_address_json,
    session_delivery_json,
    address_type_json,
    lat,
    lng,
  });
};

export const deletetAddressDeliveryApi = (id: string) => {
  return call(APIEndPoint.delete_address_delivery, id);
};

export const updateAddressDeliveryApi = async ({
  id,
  note,
  is_default,
  delivery_name,
  delivery_phone,
  delivery_time_end,
  delivery_time_start,
  delivery_address_json,
  session_delivery_json,
  address_type_json,
  lat,
  lng,
}: AddressParam): ResponseType<{
  message: string;
}> => {
  return call(APIEndPoint.update_address_delivery, {
    id,
    note,
    is_default,
    delivery_name,
    delivery_phone,
    delivery_time_end,
    delivery_time_start,
    delivery_address_json,
    session_delivery_json,
    address_type_json,
    lat,
    lng,
  });
};

export const getProvincesApi = (): ResponseType<IListProvince> => {
  return call(APIEndPoint.get_provinces);
};

export const getDistrictsApi = (
  provinceId: string
): ResponseType<IListDistrict> => {
  return call(APIEndPoint.get_districts, { provinceId });
};

export const getWardsApi = (districtId: string): ResponseType<IListWard> => {
  return call(APIEndPoint.get_wards, { districtId });
};

export const getLocationGeoApi = (address: string) => {
  return call(APIEndPoint.location_geocoding, { address });
};

export const getProfileApi = (): ResponseType<{
  profile: IProfile;
  message?: string;
}> => {
  return call(APIEndPoint.get_profile);
};

export const getListFlashSaleApi = async () => {
  try {
    const res = await call(APIEndPoint.list_flash_sale);
    const data = res.data.data.list;
    return data;
  } catch (error) {
    return [];
  }
};

export const getRegionApi = async () => {
  try {
    const res = await call(APIEndPoint.get_region);
    const data = await res.data.data.list;
    return data;
  } catch (error) {
    return [];
  }
};

export const listCategoryApi = async (): Promise<ICategory[]> => {
  try {
    const res = await call(APIEndPoint.list_category);
    const data = res.data.data.list;
    return data;
  } catch (error) {
    return [];
  }
};
