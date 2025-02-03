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
  deliveryDate?: string;
  image: string;
}

export interface Offer {
  fromCountry: string;
  toCountry: string;
  fromState: string;
  toState: string;
}
