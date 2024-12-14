import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  LogParameters,
  SalesLogFilters,
  SalesLogStateModel,
  SalesTaskList,
  SortingOrder,
} from '../interface/sales-log.interface';
import { GroupBy } from '../enum/sale-logs.eum';
import {
  CreateSalesTask,
  DeleteSalesTaskLog,
  FetchSalesTaskLogs,
  UpdateSalesLogFilters,
  UpdateSalesLogParameter,
} from './sales-log.action';
import { patch } from '@ngxs/store/operators';
import { SalesLogService } from '../services/sale-logs.service';
import { tap } from 'rxjs/operators';

const InitialState: SalesLogStateModel = {
  parameters: {
    sortBy: GroupBy.DATE,
    sortingOrder: SortingOrder.ASC,
    search: '',
  },
  filters: {
    entityNames: [],
    date: null,
    taskTypes: [],
    contactPerson: [],
    status: [],
  },
  logs: [],
};

@State<SalesLogStateModel>({
  name: 'MediaTagState',
  defaults: InitialState,
})
@Injectable()
export class SalesLogState {
  saleLogService = inject(SalesLogService);

  @Action(FetchSalesTaskLogs)
  FetchSalesLog(
    ctx: StateContext<SalesLogStateModel>,
    action: FetchSalesTaskLogs
  ) {
    const { parameters, filters } = ctx.getState();
    return this.saleLogService
      .fetchSalesLog(filters, parameters)
      .subscribe((response: SalesTaskList[]) => {
        ctx.patchState({ logs: response });
      });
  }

  @Action(CreateSalesTask)
  CreateSalesTask(
    ctx: StateContext<SalesLogStateModel>,
    action: CreateSalesTask
  ) {
    return this.saleLogService.createSalesTask(action.body).pipe(
      tap(() => {
        ctx.dispatch(new FetchSalesTaskLogs());
      })
    );
  }

  @Action(CreateSalesTask)
  UpdateSalesTask(
    ctx: StateContext<SalesLogStateModel>,
    action: CreateSalesTask
  ) {
    return this.saleLogService.updateSalesTask(action.body).pipe(
      tap(() => {
        ctx.dispatch(new FetchSalesTaskLogs());
      })
    );
  }

  @Action(DeleteSalesTaskLog)
  DeleteSalesTaskLog(
    ctx: StateContext<SalesLogStateModel>,
    action: DeleteSalesTaskLog
  ) {
    this.saleLogService.deleteSalesTaskLog(action.taskId).subscribe({
      next: () => {
        ctx.dispatch(new FetchSalesTaskLogs());
      },
      error: () => {},
    });
  }

  @Action(UpdateSalesLogFilters)
  UpdateSalesLog(
    ctx: StateContext<SalesLogStateModel>,
    action: UpdateSalesLogFilters
  ) {
    const propertyName = Object.keys(
      action.logsFilters
    )[0] as keyof SalesLogFilters;

    ctx.setState(
      patch({
        filters: patch({ [propertyName]: action.logsFilters[propertyName] }),
      })
    );
    ctx.dispatch(new FetchSalesTaskLogs());
  }

  @Action(UpdateSalesLogParameter)
  UpdateSalesLogParameter(
    ctx: StateContext<SalesLogStateModel>,
    action: UpdateSalesLogParameter
  ) {
    const propertyName = Object.keys(
      action.parameters
    )[0] as keyof LogParameters;

    ctx.setState(
      patch({
        parameters: patch({ [propertyName]: action.parameters[propertyName] }),
      })
    );
    ctx.dispatch(new FetchSalesTaskLogs());
  }
}
