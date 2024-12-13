type RequestStatus = 'new' | 'pending' | 'approved' | 'rejected';
interface State {
  name: string;
  code: string;
}
export interface CountryStates {
  [key: string]: State[];
}
export interface Request {
  id: number;
  status: RequestStatus;
  name: string;
  category: string;
  currency: string;
  price: number;
  tipPercentage: number;
  quantity: number;
  origin: string;
  delivery: string;
  deliveryDate: string;
  image: string;
}

export interface Offer {
  fromCountry: string;
  toCountry: string;
  fromState: string;
  toState: string;
}
