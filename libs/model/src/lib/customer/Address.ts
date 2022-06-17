interface IDeliveryAddressJson {
  street: string;
  ward_id: number;
  ward_name: string;
  district_id: number;
  province_id: number;
  ward_prefix: string;
  district_name: string;
  province_name: string;
  district_prefix: string;
}

export type ISessionDeliveryJson = {
  id: number;
  name: string;
  timeStart: string;
  timeEnd: string;
};

export type IAddressTypeJson = {
  id: number;
  name: string;
};
export interface IAddress {
  id: string;
  user_id: string;
  delivery_phone: string;
  delivery_address: number;
  delivery_time_start: number;
  delivery_time_end: string;
  note: string;
  created_at: string;
  updated_at: string;
  delivery_address_json: IDeliveryAddressJson;
  session_delivery_json: ISessionDeliveryJson;
  address_type_json: IAddressTypeJson;
  delivery_name: string;
  is_deleted: boolean;
  location_id: any;
  lat: number;
  lng: number;
  is_default: boolean;
}

export interface IListAddress {
  list: IAddress[];
}

export interface IProvince {
  id: number;
  name: string;
  code: string;
  location_province_id: string;
  is_active: boolean;
  priority: number;
}
export interface IListProvince {
  list: IProvince[];
}
export interface IDistrict {
  id: number;
  name: string;
  prefix: string;
  province_id: number;
  location_district_id: string;
  is_active: boolean;
}
export interface IListDistrict {
  list: IDistrict[];
}
export interface IWard {
  id: number;
  name: string;
  prefix: string;
  province_id: number;
  district_id: number;
  location_ward_id: string;
  is_active: true;
}
export interface IListWard {
  list: IWard[];
}
