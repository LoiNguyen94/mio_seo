export interface IProduct {
  id: string;
  name: string;
  photo: string;
  category: string;
  origin: string;
  market_price: number;
  unit: string;
  out_of_stock: boolean;
  price_list: {
    [id: string]: {
      qty: number;
      label: string;
      price: number;
    };
  };
  info: {
    tags: string;
    banner: string;
    photos: [];
    description: string;
  };
  updated_at: string;
  created_at: string;
  sold_out: boolean;
  is_deleted: boolean;
  partner_id: string | null;
  partner_type: ['partner', 'kcn'];
  kcn_price_list: {
    [id: string]: {
      qty: number;
      label: string;
      price: number;
    };
  };
  product_type: string;
  uom_id: number;
  region_code: 'HCM' | 'HN';
  delivery_type: string;
  product_type_id: number;
  product_id: string;
  is_stock_limit: null;
  is_max_quantity_daily_enable: null;
  log_time: string;
}