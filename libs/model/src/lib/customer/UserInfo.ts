export interface IProfile {
  address?: string;
  created_at: string;
  delivery_default_id: string;
  full_name: string;
  id: string;
  is_update_password: boolean;
  link_ref: string;
  phone?: string;
  photo?: string;
  point: number;
  region_code: string;
  region_code_selected: string;
  type: string;
  updated_at: string;
}

export interface IVoucher {
  created_at: string;
  expiring_days: number;
  id: number;
  info: {
    description: string;
    photo: string;
    title: string;
    is_used: boolean;
    value: number;
  };
}

export interface IUserInfo {
  token: string;
  profile: IProfile;
  message?: string
}
