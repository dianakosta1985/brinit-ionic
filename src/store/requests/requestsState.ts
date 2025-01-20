import { Request } from 'utiles/types';

export interface RequestsState {
  requestsData: Request[];
  error: string | null;
}
