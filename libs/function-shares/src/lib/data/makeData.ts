import {
    ChooseItemAddessState,
    DeliveryAddressJson,
    AddressParam,
    SessionDeliveryJson,
    AddressTypeJson,
  } from '@nxseo/function-shares';
  
  export function makeDataCreateAddress(data: ChooseItemAddessState) {
    const deliveryJson: DeliveryAddressJson = {
      street: data['other'],
      province_id: data['city']?.id,
      province_name: data['city']?.name,
      district_id: data['dist']?.id,
      district_name: data['dist']?.name,
      ward_id: data['ward']?.id,
      ward_name: data['ward']?.name,
    };
  
    const sessionDeliveryJson: SessionDeliveryJson = {
      id: data['sessionDelivery']?.id,
      name: data['sessionDelivery']?.name,
      timeStart: data['sessionDelivery']?.timeStart,
      timeEnd: data['sessionDelivery']?.timeEnd,
    };
  
    const addressTypeJson: AddressTypeJson = {
      id: data['typeAddress']?.id,
      name: data['typeAddress']?.name,
    };
  
    const addressParam: AddressParam = {
      location_id: '',
      note: '',
      is_default: data['default'],
      delivery_name: data['name'],
      delivery_phone: data['phone'],
      delivery_time_end: data['sessionDelivery']?.timeEnd,
      delivery_time_start: data['sessionDelivery']?.timeStart,
      delivery_address_json: deliveryJson,
      session_delivery_json: sessionDeliveryJson,
      address_type_json: addressTypeJson,
      lat: data['lat'],
      lng: data['lng'],
    };
    return addressParam;
  }
  
  export function makeDataCallBackAddress(data: any) {
    const address: ChooseItemAddessState = {
      name: data?.delivery_name,
      phone: data?.delivery_phone,
      typeAddress: data?.address_type_json ?? {
        id: 1,
        title: 'Nhà riêng',
      },
      sessionDelivery: data?.session_delivery_json ?? {
        id: 1,
        name: 'Buổi sáng (08:00 - 10:30)',
        timeStart: '08:00:00',
        timeEnd: '10:30:00',
      },
      default: data?.is_default,
  
      confirmLocation: 'exactly',
      other: data?.delivery_address_json?.street,
      city: {
        id: data?.delivery_address_json?.province_id,
        name: data?.delivery_address_json?.province_name,
      },
      dist: {
        id: data?.delivery_address_json?.district_id,
        name: data?.delivery_address_json?.district_name,
      },
      ward: {
        id: data?.delivery_address_json?.ward_id,
        name: data?.delivery_address_json?.ward_name,
      },
      lat: data?.lat,
      lng: data?.lng,
    };
    return address;
  }
  