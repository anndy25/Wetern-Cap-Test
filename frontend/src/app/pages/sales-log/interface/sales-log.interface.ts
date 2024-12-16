import { FilterOption } from '../../../interfaces/filter-menu.interface';
import { ColumnIds } from '../enum/sales-log.eum';

export enum SortingOrder {
  ASC,
  DES,
}

export interface TableColumn {
  id: ColumnIds;
  name: string;
  sort?: boolean;
  filter?: boolean;
  width?: string;
}

export interface LogParameters {
  sortBy?: ColumnIds;
  sortingOrder?: SortingOrder;
  search?: string;
}

export interface ContactPersonInfo {
  _id: string;
  name: string;
}

export interface SalesLogFilters {
  entityName: FilterOption[];
  date: { startAt: string; endAt: string };
  taskType: FilterOption[];
  contactPerson: FilterOption[];
  status: FilterOption[];
}

export interface SelectedFilters {
  entityNames: Array<string | number>;
  date: { startAt: string; endAt: string };
  taskTypes: Array<string | number>;
  contactPerson: Array<string | number>;
  status: Array<string | number>;
}

export interface TaskModel {
  id: string;
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
  appliedFilters: SalesLogFilters;
  filterOptions: Partial<SalesLogFilters>;
  logs: SalesTaskList[] | [];
}
