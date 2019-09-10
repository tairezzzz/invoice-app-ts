import { Customer } from '../../shared/interfaces/customer';

export interface State {
  entities: { [key: string]: Customer };
  currentCustomerId: string | null;
  ids: string[];
}