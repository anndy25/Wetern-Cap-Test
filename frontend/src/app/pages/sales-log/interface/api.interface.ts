import { LogParameters } from './sales-log.interface';

export interface ApiRequest<T> extends LogParameters {
  filters?: T;
}
