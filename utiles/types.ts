type RequestStatus = 'new' | 'pending' | 'approved' | 'rejected';
interface State {
  name: string;
  code: string;
}
export interface CountryStates {
  [key: string]: State[];
}
export interface Request {
  id: string;
  is_active: boolean;
  name: string;
  category: string;
  currency: string;
  price: number;
  tip: number;
  product_id: string;
  product_name: string;
  product_price: number;
  product_images: string;
  quantity: number;
  from_country: string;
  to_country: string;
  from_state: string;
  to_state: string;
  image: string;
}

export interface Offer {
  from_country: string;
  to_country: string;
  from_state: string;
  to_state: string;
  date_of_leaving: Date;
}

export interface Product {
  id?: string;
  name: string;
  price: number;
  images: string; // TODO array
  created_at?: string;
  update_at?: string;
}

export interface Country {
  id: number;
  is_active: true;
  name: string;
  code: string;
}

export interface StateOrProvince {
  id: number;
  is_active: true;
  name: string;
  country_id: number;
}
