import { Request } from 'utiles/types';

export interface RequestsState {
  requestsLst: Request[];
  error: string | null;
}
