import { ColumnIds } from '../enum/sales-log.eum';
import {
  LogParameters,
  SalesLogFilters,
  TaskModel,
} from '../interface/sales-log.interface';

export class CreateSalesTask {
  static readonly type = '[Sales Log] Create Sale Task';
  constructor(public readonly body: TaskModel) {}
}

export class UpdateSalesTask {
  static readonly type = '[Sales Log] Update Sale Task';
  constructor(
    public readonly taskId: string,
    public readonly body: TaskModel
  ) {}
}

export class FetchSalesTaskLogs {
  static readonly type = '[Sales Log] fetch';
}

export class DeleteSalesTaskLog {
  static readonly type = '[Sales Log] Delete Sale Task';
  constructor(public readonly taskId: string) {}
}

export class UpdateSalesLogParameter {
  static readonly type = '[Sales Log] Update Sale Log Parameter Task';
  constructor(public readonly parameters: LogParameters) {}
}

export class ChangeTaskStatus {
  static readonly type = '[Sales Log] Change Task Status';
  constructor(public readonly taskId: string, public readonly status: number) {}
}

export class FetchSalesLogFilters {
  static readonly type = '[Sales Log] Fetch Sales Log Filters';
}

export class UpdateAppliedSalesLogFilters {
  static readonly type = '[Sales Log] Update Sale Log Filters';
  constructor(public readonly logsFilters: SalesLogFilters) {}
}

export class RemoveFilterOption {
  static readonly type = '[Sales Log] Remove Filter';
  constructor(
    public readonly columnId: ColumnIds,
    public readonly value: string | number
  ) {}
}
