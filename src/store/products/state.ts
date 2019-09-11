import { Product } from '../../shared/interfaces/product';

export interface State {
  entities: { [key: string]: Product };
  currentProductId: string | null;
  ids: string[];
}