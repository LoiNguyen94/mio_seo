import { APIEndPoint } from './type';
import { Params } from './type';
export type EndPointType<> = {
  [P in keyof Params]: {
    prefix: (value?: string) => string;
    method: string;
  };
};

export const EndPoint: EndPointType = {
  //customer
  [APIEndPoint.login]: {
    prefix: () => 'v2/customer/auth/signin',
    method: 'POST',
  },
  [APIEndPoint.forgot_password]: {
    prefix: () => 'v2/customer/auth/forgot-password',
    method: 'POST',
  },
  [APIEndPoint.get_profile]: {
    prefix: () => 'v2/customer/auth/profile',
    method: 'GET',
  },
  [APIEndPoint.signup_with_otp]: {
    prefix: () => 'v2/customer/auth/signup-otp',
    method: 'POST',
  },
  [APIEndPoint.phone_no_exist]: {
    prefix: () => 'v2/customer/auth/check-exist-phone',
    method: 'POST',
  },
  [APIEndPoint.list_product]: {
    prefix: () => 'v2/customer/product',
    method: 'GET',
  },
  [APIEndPoint.detail_product]: {
    prefix: (id?: string) => `v2/customer/product/${id}`,
    method: 'GET',
  },
  [APIEndPoint.send_otp]: {
    prefix: () => 'v2/customer/auth/send-gen-otp',
    method: 'GET',
  },
  [APIEndPoint.gen_referer_id]: {
    prefix: () => 'v2/customer/auth/check-code',
    method: 'GET',
  },
  [APIEndPoint.list_session_delivery]: {
    prefix: () => 'v2/customer/address/session-delivery',
    method: 'GET',
  },
  [APIEndPoint.get_provinces]: {
    prefix: () => 'v2/customer/location/province',
    method: 'GET',
  },
  [APIEndPoint.get_districts]: {
    prefix: () => 'v2/customer/location/district',
    method: 'GET',
  },
  [APIEndPoint.get_wards]: {
    prefix: () => 'v2/customer/location/ward',
    method: 'GET',
  },
  [APIEndPoint.location_geocoding]: {
    prefix: () => 'v2/customer/location/geocoding/forward',
    method: 'GET',
  },
  [APIEndPoint.list_address_delivery]: {
    prefix: () => 'v2/customer/address',
    method: 'GET',
  },
  [APIEndPoint.create_address_delivery]: {
    prefix: () => 'v2/customer/address',
    method: 'POST',
  },
  [APIEndPoint.update_address_delivery]: {
    prefix: (id?: string) => `v2/customer/address/${id}`,
    method: 'PUT',
  },
  [APIEndPoint.delete_address_delivery]: {
    prefix: (id?: string) => `v2/customer/address/${id}`,
    method: 'DELETE',
  },
  [APIEndPoint.list_flash_sale]: {
    prefix: () => 'v2/customer/product/flash-sale',
    method: 'GET',
  },
  [APIEndPoint.get_region]: {
    prefix: () => 'v2/customer/address/region',
    method: 'GET',
  },
  [APIEndPoint.list_category]: {
    prefix: () => 'v2/customer/product/category',
    method: 'GET',
  },
};
