import { Request, Offer } from 'utiles/types';

export interface OffersState {
  created_offer: Offer | null;
  matched_requests: Request[];
  error: string | null;
}
