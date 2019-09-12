import { Invoice } from '../../shared/interfaces/invoice';

export interface State {
  entities: { [key: string]: Invoice };
  currentInvoiceId: string | null;
  ids: string[];
}