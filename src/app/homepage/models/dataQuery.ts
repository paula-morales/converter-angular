import { ExchangeRate } from './ExchangeRate';
import { Query } from './query';

export interface DataQuery {
  data: ExchangeRate;
  query: Query;
}
