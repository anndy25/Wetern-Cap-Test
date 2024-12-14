import {
  LogParameters,
  SalesLogFilters,
  TaskModel,
} from '../interface/sales-log.interface';

export class CreateSalesTask {
  static readonly type = '[Sales Log] Update Sale Task';
  constructor(public readonly body: TaskModel) {}
}

export class UpdateSalesTask {
  static readonly type = '[Sales Log] Update Sale Task';
  constructor(public readonly body: TaskModel) {}
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

export class UpdateSalesLogFilters {
  static readonly type = '[Sales Log] Update Sale Log Filters';
  constructor(public readonly logsFilters: SalesLogFilters) {}
}