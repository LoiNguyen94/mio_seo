export interface Model<T> {
  status: string;
  data: T;
}

export type SignUpParam = {
  platform: string;
  address: string;
  fullName: string;
  otpCode: string;
  phone: string;
  referer_id: string;
  password: string;
};

export type DeliveryAddressJson = {
  street: string;
  province_id: number;
  province_name: string;
  district_id: number;
  district_name: string;
  ward_id: number;
  ward_name: string;
};

export type SessionDeliveryJson = {
  id: number;
  name: string;
  timeStart: string;
  timeEnd: string;
};

export type AddressTypeJson = {
  id: number;
  name: string;
};

export type AddressParam = {
  location_id?: any;
  id?: number;
  note: string;
  is_default: boolean;
  delivery_time_end: string;
  delivery_time_start: string;
  delivery_name: string;
  delivery_phone: number;
  delivery_address_json: DeliveryAddressJson;
  session_delivery_json: SessionDeliveryJson;
  address_type_json: AddressTypeJson;
  lat: number;
  lng: number;
};

export type ForgotParam = {
  password: string;
  phone: string;
  otpCode: string;
};
export enum APIEndPoint {
  login = 'login',
  phone_no_exist = 'phone_no_exist',
  list_product = 'list_product',
  detail_product = 'detail_product',
  send_otp = 'send_otp',
  signup_with_otp = 'signup_with_otp',
  gen_referer_id = 'gen_referer_id',
  get_profile = 'get_profile',
  forgot_password = 'forgot_password',
  list_session_delivery = 'list_session_delivery',
  // update_session_delivery = 'update_session_delivery',
  get_provinces = 'get_provinces',
  get_districts = 'get_districts',
  get_wards = 'get_wards',
  location_geocoding = 'location_geocoding',
  list_address_delivery = 'list_address_delivery',
  create_address_delivery = 'create_address_delivery',
  update_address_delivery = 'update_address_delivery',
  delete_address_delivery = 'delete_address_delivery',
  list_flash_sale = 'list_flash_sale',
  get_region = 'get_region',
  list_category = 'list_category'
}
export interface Params {
  [APIEndPoint.login]: { phone: string; password: string };
  [APIEndPoint.phone_no_exist]: { phone: string };
  [APIEndPoint.list_product]: undefined;
  [APIEndPoint.detail_product]: string;
  [APIEndPoint.send_otp]: { phone: string };
  [APIEndPoint.signup_with_otp]: SignUpParam;
  [APIEndPoint.gen_referer_id]: { code: string };
  [APIEndPoint.get_profile]: undefined;
  [APIEndPoint.forgot_password]: ForgotParam;
  [APIEndPoint.list_session_delivery]: undefined;
  [APIEndPoint.get_provinces]: undefined;
  [APIEndPoint.get_districts]: { provinceId: string };
  [APIEndPoint.get_wards]: { districtId: string };
  [APIEndPoint.location_geocoding]: { address: string };
  [APIEndPoint.list_address_delivery]: undefined;
  [APIEndPoint.create_address_delivery]: AddressParam;
  [APIEndPoint.update_address_delivery]: AddressParam;
  [APIEndPoint.delete_address_delivery]: string;
  [APIEndPoint.list_flash_sale]: undefined;
  [APIEndPoint.get_region]: undefined;
  [APIEndPoint.list_category]: undefined;
}

export interface Model<T> {
  status: string;
  data: T;
}

export interface ResponseError {
  error: {
    code: string;
    message: string;
  };
}
