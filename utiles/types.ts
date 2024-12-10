type RequestStatus = 'new' | 'pending' | 'approved' | 'rejected';
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
