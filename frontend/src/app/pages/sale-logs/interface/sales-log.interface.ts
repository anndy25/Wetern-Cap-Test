import { GroupBy as SortBy } from '../enum/sale-logs.eum';

export enum SortingOrder {
  ASC,
  DES,
}

export interface LogParameters {
  sortBy?: SortBy;
  sortingOrder?: SortingOrder;
  search?: string;
}

export interface ContactPersonInfo {
  _id: string;
  name: string;
}

export interface SalesLogFilters {
  entityNames: string[];
  date?: { startAt: string; endAt: string } | null;
  taskTypes?: string[];
  contactPerson?: string[];
  status?: number[];
}

export interface TaskModel {
  _id: string;
  entityName: string;
  date: string;
  taskType: string;
  phoneNumber: number;
  contactPerson: ContactPersonInfo;
  note?: string;
  status: number;
}

export interface SalesTaskList {
  entity: string;
  openCount: number;
  list: TaskModel[];
}

export interface SalesLogStateModel {
  parameters: LogParameters;
  filters: SalesLogFilters;
  logs: SalesTaskList[] | [];
}
