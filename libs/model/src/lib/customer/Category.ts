export interface ICategoryItem {
  product_id: string;
  category_id: string;
}

export interface ICategory {
  id: string;
  display_name: string;
  enable: boolean;
  order: string;
  photo: string;
  partner_type: string[] | ['partner', 'kcn'];
  region_code: string;
  delivery_type: string;
  items: ICategoryItem[];
}
